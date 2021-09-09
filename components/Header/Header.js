import Link from "next/link";

export default function Header() {
	return (
		<header className="header">
			<div className="header__container">
				<p>
					<Link href="/">
						Blog Posties
					</Link>
				</p>
			</div>
		</header>
	)
}