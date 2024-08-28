import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
    const path = useLocation().pathname;

    return (
        <Navbar className='border-b-2 py-2 bg-white dark:bg-gray-800 shadow-md'>
            <Link 
                to="/"
                className='flex items-center text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-blue-900 via-purple-950 to-orange-500 rounded-lg text-white'>
                    Voyager
                </span>
                CodeQUEST
            </Link>

            <div className='flex-grow flex items-center justify-center relative'>
                <form className='flex items-center'>
                    <TextInput 
                        type='text'
                        placeholder='Search...'
                        rightIcon={AiOutlineSearch}
                        className='border-gray-300 dark:border-gray-600 hidden lg:inline'
                    />
                </form>
                   <Button className='w-10 h-10 absolute right-0 top-1/2 transform -translate-y-1/2 lg:hidden' color='gray' pill>
                        <AiOutlineSearch />
                    </Button>
            </div>
            <div className="flex items-center gap-4">
                <Navbar.Toggle className='lg:hidden' />
                <div className="hidden lg:flex items-center gap-4">
                    <Link to="/" className={`hover:text-blue-500 dark:hover:text-blue-300 ${path === '/' ? 'font-semibold' : ''}`}>
                        Home
                    </Link>
                    <Link to="/about" className={`hover:text-blue-500 dark:hover:text-blue-300 ${path === '/about' ? 'font-semibold' : ''}`}>
                        About
                    </Link>
                    <Link to="/problem-list" className={`hover:text-blue-500 dark:hover:text-blue-300 ${path === '/problem-list' ? 'font-semibold' : ''}`}>
                        Problem List
                    </Link>
                </div>
                <Button className='w-10 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon />
                </Button>
                <Link to='sign-in'>
                    <Button className='px-2 bg-gradient-to-r from-blue-900 to-red-900 rounded-lg text-white'>
                        Sign In
                    </Button>
                </Link>
            </div>

            <Navbar.Collapse className='lg:hidden flex flex-col items-center mt-2'>
                <Navbar.Link active={path === "/"} as={'div'} className='py-2'>
                    <Link to="/" className={`hover:text-blue-500 dark:hover:text-blue-300 ${path === '/' ? 'font-semibold' : ''}`}>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'} className='py-2'>
                    <Link to="/about" className={`hover:text-blue-500 dark:hover:text-blue-300 ${path === '/about' ? 'font-semibold' : ''}`}>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/problem-list"} as={'div'} className='py-2'>
                    <Link to="/problem-list" className={`hover:text-blue-500 dark:hover:text-blue-300 ${path === '/problem-list' ? 'font-semibold' : ''}`}>
                        Problem List
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};
