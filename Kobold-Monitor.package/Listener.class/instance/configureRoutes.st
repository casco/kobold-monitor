route dispatcher
configureRoutes
	teapot POST: '/reports/' -> [ :req | self handleThreatsPost: req ].
	teapot GET: '/reports/' -> [ :req | self handleThreatsIndexGet: req ]