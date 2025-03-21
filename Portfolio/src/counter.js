import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let audioPlayed = false;

document.addEventListener('click', () => {
    if (!audioPlayed) {
        const audio = new Audio('./Assets/lofi_chill.mp3');
        audio.loop = true;
        audio.volume = 0.3;
        audio.play();
        audioPlayed = true;
        audio.control = false;
    }
});

var path = "M 10 100 Q 500 100 990 100"
var finalPath = "M 10 100 Q 500 100 990 100"

var string = document.querySelector("#line")

string.addEventListener("mousemove", function (dets) {
    path = `M 10 100 Q ${dets.x} ${dets.y} 990 100`

    gsap.to("svg path", {
        attr: { d: path },
        duration: 0.5,
        ease: "bounce.inOut",
    })
})

string.addEventListener("mouseleave", function () {
    gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 0.5,
        ease: "power2.out",
    });
});
var string = document.querySelector("#line2")

string.addEventListener("mousemove", function (dets) {
    path = `M 10 100 Q ${dets.x} ${dets.y} 990 100`

    gsap.to("svg path", {
        attr: { d: path },
        duration: 0.5,
        ease: "bounce.inOut",
    })
})

string.addEventListener("mouseleave", function () {
    gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 0.5,
        ease: "power2.out",
    });
});

gsap.to(".blankspace", {
    opacity: 0,
    delay: 90,
})

var t1 = gsap.timeline()

t1.from(".left", {
    y: -20,
    opacity: 0,
    duration: 1,
})

t1.from(".right ul li", {
    stagger: 0.3,
    y: -30,
    opacity: 0,
    duration: 1,
})
t1.from(".blankspace", {
    opacity: 0,
    duration: 1,
})

gsap.from("#warrior", {
    opacity: 0,
    duration: 1,
})

gsap.from(".leftsection", { // Ensure correct selector
    x: -30,
    opacity: 0,
    duration: 2,
    ease: "power1.out",
    stagger: 0.5, // Ensure stagger property is correctly applied
    scrollTrigger: {
        trigger: ".firstsection",
        scroller: "body",
        start: "top 40%",
        end: "top 50%",
        // markers:true,
        scrub: true,
    }
})

gsap.to(".firstsection", {
    x: -30,
    opacity: 0,
    duration: 1,
    ease: "power1.inoOut",
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".firstsection",
        scroller: "body",
        start: "bottom 40%",
        end: "bottom 30%",
        // markers:true,
        scrub: true,
    }
})

// gsap.to("#warrior",{
//     opacity: 0,
//     duration:1,
//     ease:"bounce.out",
//     scrollTrigger:{
//         trigger:"#warrior",
//         scroller:"body",
//         start:"bottom 40%",
//         end:"bottom 30%",
//         markers: true,
//         scrub: true,
//     }
// })