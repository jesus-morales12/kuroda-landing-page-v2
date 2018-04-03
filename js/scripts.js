jQuery(document).ready(function ($) {
    $("#my-menu").mmenu({
        "extensions": [
            "pagedim-black",
            "position-right",
            "theme-dark"
        ]
    });
});


$(document).ready(function () {

    var productSwiper = new Swiper('.productSwiper', {
        slidesPerView: 4.5,
        spaceBetween: 20,
        loop: true,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false,
        // },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            1400: {
                slidesPerView: 4,
                spaceBetween: 25,
                loop: true,
                // autoplay: {
                //     delay: 2500,
                //     disableOnInteraction: false,
                // },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 25,
                loop: true,
                // autoplay: {
                //     delay: 2500,
                //     disableOnInteraction: false,
                // },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            768: {
                autoplay: false,
                slidesPerView: 3,
                spaceBetween: 25,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            640: {
                autoplay: false,
                slidesPerView: 3,
                spaceBetween: 25,
            },
            576: {
                autoplay: false,
                slidesPerView: 3,
                spaceBetween: 25,
            },
            425: {
                autoplay: false,
                slidesPerView: 2.4,
                spaceBetween: 25,
            },
            375: {
                loop: false,
                centeredSlides: false,
                slidesPerView: 2,
                spaceBetween: 25,
                loopFillGroupWithBlank: true,
                slidesPerGroup: 2,
            },
            320: {
                loop: false,
                centeredSlides: true,
                slidesPerView: 1.5,
                spaceBetween: 25,
            }
        }
    });

    var categorySwiper = new Swiper('.categorySwiper', {
        slidesPerView: 3,
        spaceBetween: 10,
        // init: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            425: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            375: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });
    var aboutSwiper = new Swiper('.aboutSwiper', {
        speed: 600,
        parallax: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var bathroomSwiper = new Swiper('.bathroomSwiper', {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            425: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            375: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });

    var floorSwiper = new Swiper('.floorSwiper', {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            425: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            375: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });

    var homeSwiper = new Swiper('.homeSwiper', {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            425: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            375: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });

    var plumbingSwiper = new Swiper('.plumbingSwiper', {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            425: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            375: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });

    var toolsSwiper = new Swiper('.toolsSwiper', {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            425: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            375: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });

    var hydraulicSwiper = new Swiper('.hydraulicSwiper', {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            425: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            375: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });

    var hardwareSwiper = new Swiper('.hardwareSwiper', {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2.3,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            425: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            375: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });


    $(".button--buy").click(function () {
        $(".marketplace__menu").slideToggle(10).css("display", "flex");
    });
});