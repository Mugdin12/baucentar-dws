import Navbar from "../components/Navbar";

const SigninForm = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
            <Navbar /> {/* Renderujte vašu Navbar komponentu */}

            <form onSubmit={handleSubmit} noValidate className="max-w-xl mx-auto p-6 pt-24">
                {/* Korisnicko ime */}
                <div className="mb-10">
                    <label className="block font-medium mb-2 text-lg">Korisnicko ime:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.username && <div className="text-red-600 mt-1">{errors.username}</div>}
                </div>

                {/* email */}
                <div className="mb-10">
                    <label className="block font-medium mb-2 text-lg">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.email && <div className="text-red-600 mt-1">{errors.email}</div>}
                </div>

                {/* sifra */}
                <div className="mb-10">
                    <label className="block font-medium mb-2 text-lg">Sifra:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    {errors.password && <div className="text-red-600 mt-1">{errors.password}</div>}
                </div>

                {/* submit */}
                <button
                    type="submit"
                    className="bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition-colors"
                >
                    Prijavi se
                </button>

                {errors.submit && <div className="text-red-600 mt-4">{errors.submit}</div>}
                {successMsg && <div className="text-green-700 mt-4">{successMsg}</div>}
            </form>
        </div>
    )
}

export default SigninForm;