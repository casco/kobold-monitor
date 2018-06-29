initialize
initialize
	teapot := Teapot configure: {(#port -> self defaultPort)}.
	reports := OrderedCollection new. 