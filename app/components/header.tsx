export default function Header({children}:any){
    return(
        <header>
          <nav className='flex justify-end'>
            {children}
          </nav>
        </header>
    );
}