###############################################
# Compilers and flags
###############################################

HTMLC := pug
HTMLFLAGS := -s -O items.js
HTMLPFLAGS := -s -O items.js -P

CSSC := stylus
CSSFLAGS := -c -q
CSSPFLAGS := -q

JSC := minify
JSCOM = ${JSC} -o $@ $^
JSPCOM = cp $^ $@

###############################################
# Files/paths
###############################################

BUILDDIR := dist
CSSBUILDDIR := ${BUILDDIR}/css
JSBUILDDIR := ${BUILDDIR}/js
IMGBUILDDIR := ${BUILDDIR}/img

CSSSRCDIR := styl
CSSSRCFILES := $(wildcard ${CSSSRCDIR}/*.styl)
CSSBUILDFILES := $(patsubst ${CSSSRCDIR}/%.styl, ${CSSBUILDDIR}/%.css, ${CSSSRCFILES})

JSSRCDIR := js
JSSRCFILES := $(wildcard ${JSSRCDIR}/*.js)
JSBUILDFILES := $(patsubst ${JSSRCDIR}/%.js, ${JSBUILDDIR}/%.js, ${JSSRCFILES})

IMGSRCDIR := img
IMGSRCDIRS := $(shell find ${IMGSRCDIR}/ -type d)
IMGBUILDDIRS := $(patsubst ${IMGSRCDIR}/%, ${IMGBUILDDIR}/%, ${IMGSRCDIRS})

IMGSRCFILES := $(shell find ${IMGSRCDIR}/ -type f | sed 's: :\\ :g')
IMGBUILDFILES := $(patsubst ${IMGSRCDIR}/%, ${IMGBUILDDIR}/%, ${IMGSRCFILES})

###############################################
# Compile files
###############################################

all: ${BUILDDIR} html css js img

html: ${BUILDDIR}/index.html

css: ${CSSBUILDDIR} ${CSSBUILDFILES}

js: ${JSBUILDDIR} ${JSBUILDFILES}

img: ${IMGBUILDDIR} ${IMGBUILDDIRS} ${IMGBUILDFILES}

pretty: ${BUILDDIR} html_pretty css_pretty js_pretty img

html_pretty: HTMLFLAGS := ${HTMLPFLAGS}
html_pretty: html

css_pretty: CSSFLAGS := ${CSSPFLAGS}
css_pretty: css

js_pretty: JSCOM = ${JSPCOM}
js_pretty: js

.PHONY: all
.PHONY: html
.PHONY: css
.PHONY: js
.PHONY: img
.PHONY: pretty

###############################################
# Create build directories as needed
###############################################

MKDIR_P := mkdir -p

${BUILDDIR}:
	${MKDIR_P} ${BUILDDIR}

${CSSBUILDDIR}:
	${MKDIR_P} ${CSSBUILDDIR}

${JSBUILDDIR}:
	${MKDIR_P} ${JSBUILDDIR}

${IMGBUILDDIR}:
	${MKDIR_P} ${IMGBUILDDIR}

${IMGBUILDDIR}/%:
	${MKDIR_P} $@

###############################################
# Build
###############################################

${BUILDDIR}/index.html: index.pug items.js
	${HTMLC} ${HTMLFLAGS} -o ${BUILDDIR} $^

${CSSBUILDDIR}/%.css: ${CSSSRCDIR}/%.styl
	${CSSC} ${CSSFLAGS} -o $@ $^

${JSBUILDDIR}/%.js: ${JSSRCDIR}/%.js
	${JSCOM}

${IMGBUILDDIR}/%.png: ${IMGSRCDIR}/%.png
	cp "$^" "$@"

${IMGBUILDDIR}/%.jpg: ${IMGSRCDIR}/%.jpg
	cp "$^" "$@"

###############################################
# Cleanup
###############################################

clean:
	rm -r ${BUILDDIR}
