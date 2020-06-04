HTMLC := pug
HTMLFLAGS := 

CSSC := stylus
CSSFLAGS := -c

JSC := uglifyjs
JSFLAGS := -c -m

BUILDDIR := dist
CSSBUILDDIR := ${BUILDDIR}/css
JSBUILDDIR := ${BUILDDIR}/js

###############################################

CSSSRCDIR := styl
CSSSRCFILES := $(wildcard ${CSSSRCDIR}/*.styl)
CSSBUILDFILES := $(patsubst ${CSSSRCDIR}/%.styl, ${CSSBUILDDIR}/%.css, ${CSSSRCFILES})

JSSRCDIR := js
JSSRCFILES := $(wildcard ${JSSRCDIR}/*.js)
JSBUILDFILES := $(patsubst ${JSSRCDIR}/%.js, ${JSBUILDDIR}/%.js, ${JSSRCFILES})

###############################################

all: ${BUILDDIR} html css js img

html: ${BUILDDIR}/index.html

css: ${CSSBUILDDIR} ${CSSBUILDFILES}

js: ${JSBUILDDIR} ${JSBUILDFILES}

img:
	cp -r img dist

.PHONY: all
.PHONY: html
.PHONY: css
.PHONY: js
.PHONY: img

###############################################

MKDIR_P := mkdir -p

${BUILDDIR}:
	${MKDIR_P} ${BUILDDIR}

${CSSBUILDDIR}:
	${MKDIR_P} ${CSSBUILDDIR}

${JSBUILDDIR}:
	${MKDIR_P} ${JSBUILDDIR}

${BUILDDIR}/index.html: index.pug
	${HTMLC} ${HTMLFLAGS} -o ${BUILDDIR} $^

${CSSBUILDDIR}/%.css: ${CSSSRCDIR}/%.styl
	${CSSC} ${CSSFLAGS} -o $@ $^

${JSBUILDDIR}/%.js: ${JSSRCDIR}/%.js
	${JSC} ${JSFLAGS} -o $@ $^

###############################################

clean:
	rm -r ${BUILDDIR}
