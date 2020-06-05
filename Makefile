###############################################
# Compilers and flags
###############################################

HTMLC := pug
HTMLFLAGS := -s

CSSC := stylus
CSSFLAGS := -c -q

JSC := uglifyjs
JSFLAGS := -c -m

IMGC := cp
IMGFLAGS := -r

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
IMGSRCFILES := $(wildcard ${IMGSRCDIR}/*)
IMGBUILDFILES := $(patsubst ${IMGSRCDIR}/%, ${IMGBUILDDIR}/%, ${IMGSRCFILES})

###############################################
# Compile files
###############################################

all: ${BUILDDIR} html css js img

html: ${BUILDDIR}/index.html

css: ${CSSBUILDDIR} ${CSSBUILDFILES}

js: ${JSBUILDDIR} ${JSBUILDFILES}

img: ${IMGBUILDDIR} ${IMGBUILDFILES}

.PHONY: all
.PHONY: html
.PHONY: css
.PHONY: js
.PHONY: img

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

###############################################
# Build
###############################################

${BUILDDIR}/index.html: index.pug
	${HTMLC} ${HTMLFLAGS} -o ${BUILDDIR} $^

${CSSBUILDDIR}/%.css: ${CSSSRCDIR}/%.styl
	${CSSC} ${CSSFLAGS} -o $@ $^

${JSBUILDDIR}/%.js: ${JSSRCDIR}/%.js
	${JSC} ${JSFLAGS} -o $@ $^

${IMGBUILDDIR}/%: ${IMGSRCDIR}/%
	${IMGC} ${IMGFLAGS} $^ $@

###############################################
# Cleanup
###############################################

clean:
	rm -r ${BUILDDIR}
