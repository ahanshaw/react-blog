import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Head from 'next/head'

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Blog Posties</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<div className="wrapper">
				<div>
					<Header />
					<main>{children}</main>
				</div>
				<Footer />
			</div>
		</>
	)
}