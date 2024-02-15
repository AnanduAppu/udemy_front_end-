import logimg from "../../assets/ud8862w3a2-udemy-logo-welcome-to-our-new-brand-udemy-instructor-community.png"
import LanguageIcon from '@mui/icons-material/Language';
function Footer() {
  return (
    <>
      <div style={{ backgroundColor: 'rgb(28, 28, 30)' }} >
      <div className="max-w-screen-xl mx-4 px-2 sm:px-6 text-white flex flex-wrap justify-between">
        <div>
          <div className="text-xs uppercase text-gray-500 font-medium"></div>
          <a className="my-3 block" href="/#">Udemy Business</a>
          <a className="my-3 block" href="/#">Teach on Udemy</a>
          <a className="my-3 block" href="/#">Get the app </a>
          <a className="my-3 block" href="/#">About us</a>
          <a className="my-3 block" href="/#">Contact us</a>
        </div>
        <div >
          <div className="text-xs uppercase text-gray-500 font-medium"></div>
          <a className="my-3 block" href="/#">Career</a>
          <a className="my-3 block" href="/#">Blog</a>
          <a className="my-3 block" href="/#">Help and Support</a>
          <a className="my-3 block" href="/#">Affiliate</a>
          <a className="my-3 block" href="/#">Investors</a>
        </div>
        <div >
          <div className="text-xs uppercase text-gray-500 font-medium"></div>
          <a className="my-3 block" href="/#">Terms</a>
          <a className="my-3 block" href="/#">Privacy Policy</a>
          <a className="my-3 block" href="/#">Cookie setting </a>
          <a className="my-3 block" href="/#">Sitemap </a>
          <a className="my-3 block" href="/#">Accessibility Statement </a>
        </div>

        <div >
          <div className="text-xs uppercase text-gray-500 font-medium"></div>
          <a className="my-3 block mt-10" href="/#"><span className="border-white border text-white py-2 pr-11"><LanguageIcon className="mx-2 mb-[5px] "/>English</span></a>
          
        </div>
       
      </div>
    <img src={logimg} alt="logo" width={150} height={10} className="p-6 pl-10" />
    </div>

    </>
  )
}

export default Footer