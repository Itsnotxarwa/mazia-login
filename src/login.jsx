import { Link, useNavigate } from "react-router-dom";
import MaziaLogo from './assets/image.png';


export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const form = e.target;
        if (form.checkValidity()) {
            localStorage.setItem("auth", "true");
            navigate("/dashboard");
        }
};

    return(
        <div className='min-h-screen relative flex flex-col items-center justify-center'>
            <div className='max-w-4xl mx-8 sm:mx-6 lg:mx-16'>
                <div className='flex flex-col gap-2'>
                <div className='space-y-4 flex flex-col items-center justify-center'>
                    <div>
                        <img src={MaziaLogo} alt="logo" className='w-56 h-auto' />
                    </div>
                    <div className='text-2xl font-bold'>
                        Bienvenue
                    </div>
                    <div className='text-sm text-center'>
                        Connectez-vous à Mazia pour accéder à votre espace.
                    </div>
                </div>
                <div className="mt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='flex flex-col space-y-1'>
                            <label htmlFor="email">Email</label>
                            <input 
                            type="email" 
                            placeholder='Entrez votre email'
                            className='h-10 px-3 py-2 rounded-md w-full border border-gray-300 bg-white 
                            placeholder:text-gray-500 text-sm text-gray-900
                            focus:border-[#032ca6] focus-visible:outline-none'
                            required />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <label htmlFor="password">Mot de passe</label>
                            <input 
                            type="password" 
                            placeholder='Entrez votre mot de passe'
                            className='h-10 px-3 py-2 rounded-md w-full border border-gray-300 bg-white 
                            placeholder:text-gray-500 text-sm text-gray-900
                            focus:border-[#032ca6] focus-visible:outline-none'
                            required />
                        </div>
                        <div>
                            <button
                            type='submit'
                            className="button-connecter mt-4 w-full"
                            >
                                Se connecter
                            </button>
                        </div>
                    </form>
                    <p className='text-center text-sm text-gray-600 mt-6'>
                        Vous n'avez pas de compte ? {" "}
                        <Link
                        to="/demo"
                        className="text-blue-600 hover:text-blue-500 underline">
                        Prendre rendez-vous
                        </Link>
                    </p>
                </div>
                </div>
            </div>
        </div>
    )
}