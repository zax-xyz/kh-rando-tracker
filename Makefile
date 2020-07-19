###############################################
# Compilers and flags
###############################################

HTMLC := npx pug
HTMLFLAGS := -s -O items.js
HTMLPFLAGS := -s -O items.js -P

CSSC := npx stylus
CSSFLAGS := -c -q
CSSPFLAGS := -q

JSC := npx babel
JSFLAGS := --minified --no-comments --presets=@babel/preset-env
JSPFLAGS := --presets=@babel/preset-env

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

###############################################
# Compile files
###############################################

all: ${BUILDDIR} html css js img

html: ${BUILDDIR}/index.html

css: ${CSSBUILDDIR} ${CSSBUILDFILES}

js: ${JSBUILDDIR} ${JSBUILDFILES}

img:
	cp -r ${IMGSRCDIR} ${IMGBUILDDIR}

pretty: ${BUILDDIR} html_pretty css_pretty js_pretty img

html_pretty: HTMLFLAGS := ${HTMLPFLAGS}
html_pretty: html

css_pretty: CSSFLAGS := ${CSSPFLAGS}
css_pretty: css

js_pretty: JSFLAGS := ${JSPFLAGS}
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

###############################################
# Build
###############################################

${BUILDDIR}/index.html: index.pug items.js
	${HTMLC} ${HTMLFLAGS} -o ${BUILDDIR} $^

${CSSBUILDDIR}/%.css: ${CSSSRCDIR}/%.styl
	${CSSC} ${CSSFLAGS} -o $@ $^

${JSBUILDDIR}/%.js: ${JSSRCDIR}/%.js
	${JSC} ${JSFLAGS} -o $@ $^

###############################################
# Cleanup
###############################################

clean:
	rm -r ${BUILDDIR}
