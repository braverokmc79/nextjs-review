import React from 'react'
import NavLink from './NavLink'
import SignOutButton from './SignOutButton'
import Link from 'next/link';


const NavBar:React.FC = async () => {

    const user = null;
  

  return (
    <nav>
    <ul className="flex gap-2">
    <li >
     <Link href='/'
      className="font-bold font-orbitron 
        text-2xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md"
     >인디 게이머</Link> 
    </li>

      <li className="ml-auto">
        <NavLink href="/reviews">
        리뷰
        </NavLink>
      </li>
      <li>
        <NavLink href="/about" prefetch={false}>
          소개
        </NavLink>
      </li>
      {user ? (
        <li>
          <SignOutButton />
        </li>
      ) : (
      <li>
        <NavLink href="/sign-in">
          로그인
        </NavLink>
      </li>
      )}
    </ul>
  </nav>
  )
}

export default NavBar