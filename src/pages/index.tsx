import Link from "next/link"


export default function Home() {
  return (
    <>
    <h2>Menu</h2>
    <ul>
      <li><Link href={'/about'}>About</Link></li>
      <li><Link href={'/portfolio'}>Portfolio</Link></li>
      <li><Link href={'/clients'}>Clients</Link></li>

      <li><Link replace={true} href={'/about'}>Link using replace prop (leads to about page)</Link></li>
    </ul>
     
    </>
  )
}
