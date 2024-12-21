import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo,smallHeroVideo } from '../utils';
import { useEffect,useState } from 'react';

const Hero = () => {
  const [videoSrc,setVideoSrc] = useState(window.innerWidth<760 ? smallHeroVideo : heroVideo) 
  //this will be changing the useStates of the videos on how large the
  //screen is. If on pc, then the video size will be the normal size and if on phone it will be the small one
  //? and : are if innerwidht is smaller than 760 px then use small hero video, else use herovideo
  const handleVideoSrcSet = () => {
    if(window.innerWidth<760){
        setVideoSrc(smallHeroVideo)
    }else{
        setVideoSrc(heroVideo)
    }
  }
  //creating a new function here for below
  useEffect(() => {
    window.addEventListener('resize',handleVideoSrcSet)
    return () => {
        window.removeEventListener('resize',handleVideoSrcSet)
    }
  },[])
  //when the screen is resized it will take it so that it will change the video by the size of the window.
  //in react we will have to return a funciton to remove the eventlistener so that it will recompose and not have the last effect in play
  useGSAP(() => {
    gsap.to('#hero',{opacity: 1, delay: 2}) //changing opacity to 1 (defautl was 0) and a delay of 1.5 for video in middle
    gsap.to('#cta',{opacity: 1, y: -50, delay: 2})
  },[] )
  //gsap is the animation provider, changing the css values as we  will go on

  return (//pointer-events-none so that nobody can mess with the video
  // autoPlay so when loaded it will automatically start pallying, muted so no sounds and playsInline so that it won't exceed lines
    <section className='w-full nav-height bg-black relative'>
        <div className='h-5/6 w-full flex-center flex-col'>
            <p id="hero" className='hero-title'> 
                iPhone 16 Pro
            </p>
            <div className="md:width-10/12 width-9/12">
                <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
                    <source src={videoSrc} type='video/mp4'/>
                </video>
            </div>
        </div>
        <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
            <a href="#highlights" className="btn">
                Buy
            </a>
            <p className="font-normal text-xl">
                From $199/month or $999
            </p>
        </div>
    </section>
  )
}

export default Hero