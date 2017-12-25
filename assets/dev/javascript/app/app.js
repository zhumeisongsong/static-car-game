var mySwiper;
$(document).ready(function () {
    //ScratchPad
    var scratch_pad = function () {
        var $canvas = $("#elem_canvas");
        $canvas.wScratchPad({
            size: 20,          // The size of the brush/scratch.
            fg: '../image/background/aword@2x.jpg',  // Foreground (image path or hex color).
            realtime: true,       // Calculates percentage in realitime.
            scratchDown: null,       // Set scratchDown callback.
            scratchUp: null,       // Set scratchUp callback.
            scratchMove: null,       // Set scratcMove callback.
            cursor: 'crosshair' // Set cursor.
        });
        $canvas.css({background: 'none'});
        $canvas.find('img').css({display: 'none'});
        $canvas.find('canvas').css({width: window.width, height: '180px'})
    };

    var http_str = location.href;
    if (http_str.match('#slide10') == '#slide10') {
        $('main').removeClass('hidden');
        scratch_pad();
    } else {
        setTimeout(function () {
            var $loading = $('.preloader-con');
            $loading.removeClass('hidden');
            $loading.delay(7500).fadeOut('slow');
            var demo = new CountUp("number", 0, 100, 0, 8);
            demo.start();
            $('main').removeClass('hidden');
        }, 2000)

    }
    var playFlag = true;

    //swiper
    var page_index = 0;
    var right_number = 0;
    var btn_banner = function () {
        var index_arr = [1, 2, 3, 4, 5];
        if ($.inArray(page_index, index_arr) != -1) {
            $('.btn-con').removeClass('hidden')
        } else {
            $('.btn-con').addClass('hidden')
        }

        var header_btn_show_arr = [3, 4, 5];
        if ($.inArray(page_index, header_btn_show_arr) != -1) {
            $('.header-btn').removeClass('hidden')
        } else {
            $('.header-btn').addClass('hidden')
        }

    };
    mySwiper = new Swiper('.swiper-container', {
        observer: true,
        observeParents: true,
        hashnav: true,
        noSwiping: true,
        onInit: function (swiper) {
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
            btn_banner();
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper);
            page_index = swiper.activeIndex;
            btn_banner();
            if(page_index==8){
                scratch_pad();
            }

        }
    });

    var bind = function () {
        right_number = 0;
        //选答案
        var select = function () {
            var a = 1;
            $('.select-item').click(function () {
                var set_answer = function ($elem) {
                    //选答案
                    var img_path = "../image/text/";
                    var km_data = $elem.attr('data-km');
                    var select_img = img_path + km_data + "km@2x.png";

                    //抓正确答案
                    var $container = $('.ques-' + page_index);
                    var right_data = $container.attr('data-right');

                    //显示所选
                    $container.find(".select-text").find('img').attr('src', select_img).css('opacity', '1');

                    //显示对错
                    var select_avtive = img_path + km_data + "km_active@2x.png";//字src
                    var select_right = img_path + right_data + "km_active@2x.png";
                    console.log(km_data, right_data)

                    if (km_data == right_data) {
                        $elem.find('.img-normal').attr('src', select_avtive);
                        $elem.addClass('right');
                        right_number++

                    } else {
                        //正确选项
                        $container.find(".select-item[data-km=" + right_data + "]").find('.img-normal').attr('src', select_right);
                        $container.find(".select-item[data-km=" + right_data + "]").addClass('right');
                        //错误选项
                        $elem.find('.img-normal').attr('src', select_avtive);
                        $elem.addClass('wrong');
                    }

                    // 写setion
                    sessionStorage.setItem('ques_' + page_index, km_data);

                    //out_audio
                    var drive_music = function () {
                        var audio = document.getElementById("drive_audio");
                        audio.play();

                    };

                    // if (playFlag) {
                    drive_music();
                    // }

                    //out动画
                    var drive_animation = function () {
                        if (page_index == 5) {
                            $('.circle-move').addClass('trans-circle');
                        } else if (page_index == 4) {
                            $('.yellow-car').animate({right: "-100px"}, 800);
                            $container.find('.red-car').animate({left: "420px"}, 1500);
                        } else {
                            $container.find('.red-car').animate({left: "420px"}, 1500);
                        }
                    };
                    drive_animation();
                };

                if (a) {
                    a = 0;
                    set_answer($(this));
                }
            });
        };
        select();

        //翻页
        $('.front-btn').click(function () {
            mySwiper.slidePrev();
            page_index = mySwiper.activeIndex;
        });
        $('.next-btn').click(function () {
            select();
            if (sessionStorage.getItem('ques_' + page_index) != undefined) {
                mySwiper.slideNext();
                page_index = mySwiper.activeIndex;
            } else {
                alert("您还没有选择答案奥！")
            }
        });

        //header btn add
        $('.header-btn').click(function () {
            mySwiper.slideTo(6);
            page_index = mySwiper.activeIndex;
        });
        var share_what = function () {
            var local_img_root = '../image/background/';
            var right_number = localStorage.getItem('right_number');
            console.log(right_number);
            if (right_number <= 1) {
                $('.share-img').attr('src', local_img_root + 'share01@2x.png');
            } else if (right_number == 2 || right_number == 3) {
                $('.share-img').attr('src', local_img_root + 'share02@2x.png')
            } else if (right_number == 4) {
                $('.share-img').attr('src', local_img_root + 'share03@2x.png');

            } else if (right_number == 5) {
                $('.share-img').attr('src', local_img_root + 'share04@2x.png');
            }
        };

        //禁滑页面跳转处理
        var btn_click = function () {
            $('.finish-btn').click(function () {
                mySwiper.slideTo(7);
                page_index = mySwiper.activeIndex;
                localStorage.setItem('right_number', right_number);
            });
            $('.aword-btn').click(function () {
                page_index = mySwiper.activeIndex;
                mySwiper.slideTo(8);
            });
            $('.grade-btn').click(function () {
                page_index = mySwiper.activeIndex;
                mySwiper.slideTo(9);
                share_what();
                is_weixn()
            });
            function is_weixn() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger" || (ua.match(/\sqq/i) == " qq")) {
                    setTimeout(function () {
                        $('.share-guide').removeClass('hidden')
                    }, 3000);
                } else {
                    return false;
                }
            }

            $('.share-btn').click(function () {
                location.href = 'http://app.mall.autohome.com.cn/?type=nov11';
            })

        };
        btn_click()
    };
    bind();
//fast
    FastClick.attach(document.body);

    // 微信配置
    $.ajax({
        url: "服务器端请求地址",
        type: "POST",
        async: true,
        cache: false,
        dataType: "json",
        success: function (data) {
            // 微信配置
            wx.config({
                debug: true,
                appId: "你的AppID",
                timestamp: '上一步生成的时间戳',
                nonceStr: '上一步中的字符串',
                signature: '上一步生成的签名',
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
            });

            var share_title = document.title;
            var share_url = '';
            var share_img_url = '';
            var share_info = '';

            wx.ready(function () {
                // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                wx.onMenuShareTimeline({
                    title: share_title, // 分享标题
                    link: share_url,
                    imgUrl: share_img_url // 分享图标
                });
                // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                wx.onMenuShareAppMessage({
                    title: share_title, // 分享标题
                    desc: share_info, // 分享描述
                    link: share_url,
                    imgUrl: share_img_url // 分享图标
                });
            });
        },
        error: function () {
            // alert('ajax request failed!!!!');  
            return;
        }
    });

    //music
    var music = function () {
        var audio = document.getElementById("audio");
        var drive_audio = document.getElementById("drive_audio");
        // document.addEventListener("WeixinJSBridgeReady", function () {
        //     audio.play();
        // }, false);

        audio.play();
        touch_first = true;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
        } else {
            document.addEventListener("touchstart", function () {
                if (touch_first) {
                    audio.play();
                    touch_first = false;
                }
            }, false);

        }

        $('.music-img').click(function () {
            if (playFlag) {
                $(this).removeClass('rotate').attr('src', '../image/icon/pause.png');
                audio.pause();
                playFlag = false;
            } else {
                $(this).addClass('rotate').attr('src', '../image/icon/music.png');
                audio.play();
                // drive_audio.pause();
                playFlag = true;
            }
        })

    };

});


