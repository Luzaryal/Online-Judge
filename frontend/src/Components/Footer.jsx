import { Footer } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex grid-cols-1">
                <div className="mt-5">
                <Link 
                to="/"
                className='flex items-center text-lg sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-blue-900 via-purple-950 to-orange-500 rounded-lg text-white'>
                    Voyager
                </span>
                CodeQUEST
            </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                    <Footer.Title title='About' />
                    <Footer.LinkGroup col>
                        <Footer.Link href='https://unstop.com/u/sohomman2378' target='_blank' rel='noopener noreferrer'>
                            Unstop Account
                        </Footer.Link>
                        <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                            Voyager CodeQUEST
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title='Follow Us' />
                    <Footer.LinkGroup col>
                        <Footer.Link href='https://github.com/Luzaryal' target='_blank' rel='noopener noreferrer'>
                            GitHub
                        </Footer.Link>
                        <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                            Discord
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title='Legal' />
                    <Footer.LinkGroup col>
                        <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                            Privacy Policy
                        </Footer.Link>
                        <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                            Terms & Conditions
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href='#' by='Voyager CodeQUEST' year={new Date().getFullYear()} />
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href='https://www.facebook.com/profile.php?id=100011180589932' target='_blank' icon={BsFacebook}/>
                    <Footer.Icon href='https://www.instagram.com/ultra.legend_145/?hl=en' target='_blank' icon={BsInstagram}/>
                    <Footer.Icon href='https://x.com/Luzaryal' target='_blank' icon={BsTwitter}/>
                    <Footer.Icon href='https://github.com/Luzaryal' target='_blank' icon={BsGithub}/>
                    <Footer.Icon href='https://www.linkedin.com/in/sohom-ray-mandal-29a95624a/' target='_blank' icon={BsLinkedin}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}
