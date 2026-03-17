import { Link } from "react-router-dom";
import MaziaLogo from './assets/image.png';
import { useState } from "react";


export default function Login() {

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError(null)

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        try {
            const response = await fetch('https://api.voixup.fr/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify({   
                        email: email, 
                        password: password
                    }),
            });

            if (response.status === 401) {
                setError("Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.");
                form.password.value = ""
                return;
            }

            if (!response.ok) {
                setError("Une erreur est survenue. Veuillez réessayer plus tard.");
                return;
            }
            
            const data = await response.json();

            console.log(data)
            
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("role", data.role);

            form.reset();

            if (data.role === "admin") {
                window.location.href = `https://system-dashboard-lilac.vercel.app/?token=${data.access_token}&role=${data.role}&userId=${data.user_id}`;
            } else {
                window.location.href = `https://user-dashboard-virid-mu.vercel.app/?token=${data.access_token}&role=${data.role}&userId=${data.user_id}`;
            }
        } catch (error) {
            console.error(error);
            setError("Impossible de se connecter au serveur. Veuillez réessayer.")
            return;
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
                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}
                <div className="mt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='flex flex-col space-y-1'>
                            <label htmlFor="email">Email</label>
                            <input 
                            type="email" 
                            name="email"
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
                            name="password"
                            onChange={() => setError(null)}
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