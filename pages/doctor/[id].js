import React from "react"
import { useRouter } from "next/router"
import { BiMap, BiVideo, BiHelpCircle } from "react-icons/bi";
import { FaDiagnoses } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";

import Header from "components/Header"
import Footer from "components/Footer"
import BreadCrumb from "components/BreadCrumb"
import StarRating from "components/StarRating"
import SelectBox from "components/SelectBox"

import Profile from "components/doctor/Profile"
import Services from "components/doctor/Services"
import RateReview from "components/doctor/RateReview"
import OfficeInfo from "components/doctor/OfficeInfo"

const ImgContainer = () => {
  const [imgContainerSize, setImgContainerSize] = React.useState();
  React.useEffect(() => {
    function handleResize() {
      var imgContainer = document.getElementById('white-container');
      if (imgContainer) {
        var size = {
          width: imgContainer.offsetWidth,
          height: imgContainer.offsetHeight + 48
        };
        // console.log(size.width, '--', size.height)
        setImgContainerSize(size);
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="relative mt-10">
      <img src="/doctor/imgBack.png" className="" alt="img-back" style={{ width: '100%', height: imgContainerSize?.height }} />
      <div className="absolute inset-0 px-6 lg:px-36 py-6 flex justify-center items-center">
        <div id="white-container" className="bg-white w-full p-4 flex flex-col sm:flex-row sm:flex-wrap rounded-md">
          <div id="profile-img" className="w-full sm:w-1/3 lg:w-1/4">
            <img src="/doctor/profile.png" className="object-cover w-full h-52 sm:object-fill sm:w-full sm:h-full rounded-md" alt="profile" />
          </div>
          <div id="text-part" className="w-full sm:w-2/3 lg:w-2/4 sm:px-10 py-4 flex flex-col justify-center">
            <div className="flex">
              <span className="text-md text-gray-900 font-bold">Katarzyna(Kasla) Ostrezenska, MD</span>
              <BiHelpCircle className="ml-1" />
            </div>
            <span className="text-sm text-gray-700 mt-4">Board Certified Plastic Surgeon</span>
            <div className="mt-4">
              <StarRating />
            </div>
            <div className="flex items-center mt-4">
              <BiMap /><span className="text-sm text-gray-800 ml-1">15 Broad St. Boston, MA 02019</span>
            </div>
            <div className="flex mt-4">
              <FaDiagnoses /><span className="text-sm text-gray-800 ml-1">Longevity, Wellbeing. Skincare, Weight Loss</span>
            </div>
            <div className="flex mt-4">
              <BiVideo /><span className="text-sm text-gray-800 ml-1">Virtual Consultation Available</span>
            </div>
          </div>
          <div id="rectangle" className="w-full sm:w-full lg:w-1/4 bg-gray-100 flex flex-col justify-center items-center rounded-md mt-4 lg:mt-0 p-6">
            <span className="text-sm text-gray-900">Talk to one of our care managers to help you get started.</span>
            <button className="btn btn-secondary h-10 mt-6">Schedule Your Free Call</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const TabContainer = (props) => {
  return (
    <div>
      <div className="hidden sm:flex justify-center items-center bg-gray-200 h-12">
        {
          props.tabs.map((tab, index) => (
            <div key={index} className="relative flex flex-col items-center cursor-pointer mx-4" onClick={() => props.setSelectedTab(tab)}>
              <span className={`text-sm text-center ${tab.value === props.selectedTab.value ? 'text-primary-100 font-bold' : 'text-gray-700'}`}>{tab.label}</span>
              {
                tab.value === props.selectedTab.value &&
                <BsCircleFill className="absolute -bottom-3 w-1 text-bluetone-dark" />
              }
            </div>
          ))
        }
      </div>
      <div className="sm:hidden p-6">
        <SelectBox options={props.tabs} selectedOption={props.selectedTab} setSelectedOption={props.setSelectedTab} backColor='transparent' />
      </div>
    </div>
  )
}

const Doctor = () => {
  const router = useRouter()
  const { id } = router.query

  const tabs = [
    {
      label: 'Profile',
      value: 'profile',
      component: Profile
    },
    {
      label: 'Services',
      value: 'services',
      component: Services
    },
    {
      label: 'Rating and Reviews',
      value: 'ratereview',
      component: RateReview
    },
    {
      label: 'Office information',
      value: 'info',
      component: OfficeInfo
    }
  ]
  const [selectedTab, setSelectedTab] = React.useState(tabs[0])

  return (
    <div>
      <Header theme="dark" />
      <BreadCrumb data={['Doctor', id, selectedTab.label]} />
      <ImgContainer />
      <TabContainer tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <selectedTab.component />
      <Footer />
    </div>
  )
}

export default Doctor