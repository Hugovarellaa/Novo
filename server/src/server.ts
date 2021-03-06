import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
	return 'Test app 1'
})

const PORT = 3333

app
	.listen({
		port: PORT,
	})
	.then(() => console.log('🚀🚀 Server running in port 🚀🚀', PORT))
