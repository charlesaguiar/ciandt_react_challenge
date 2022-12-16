export default function Subtitle({ children, size = 'xl' }) {
	return <h3 className={`text-${size} font-bold text-gray-500`}>{children}</h3>;
}
