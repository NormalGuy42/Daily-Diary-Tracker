export default function Header({children}:any){
    return(
        <header>
          <nav className='flex justify-end pr-4'>
            {children}
          </nav>
        </header>
    );
}