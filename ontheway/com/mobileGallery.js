/**
 * 基于zepto的mobile版本gallery
 * 依赖zepto.js
 * author lilyh
 * 2014-07-17
 * 去掉对zepto-touch的依赖
 * 2014-09-01
 */
(function($, window, document, undefined) {
    var G = null,
        element = null,
        elementMask = null;
    var Config = {
       gHTML : [
            '<div class="hd"></div>',
            '<div class="bd">',
                '<div id="gallery_list"></div>',
            '</div>',
            '<div class="ft"></div>'
        ].join(''),
        gListEl : null,
        gListBdEl : null,
        gImgParentList:{},
        gImgList : {},
        gImgLen : 0,
        gImgListPreBtn : null,
        gImgListNextBtn : null,
        pContainer : null,
        pCurImgUrl : '',
        pPrevImgUrl : '',
        pNextImgUrl :''
    };
    
    var Gallery = function(settings){
        var $settings = setSettings(settings);
       
        function closeGallary(e){
            e.preventDefault();
            removeEventPhone();
            element.hide();
            elementMask.hide();
            Config.gListEl.html('');
            
        }
        
        /**手机版本*/
        function initEventPhone(){
           
            Config.gListBdEl[0].addEventListener('tap', closeGallary, false);
            Config.gListEl[0].addEventListener('swipeleft', previewNext, false);
            Config.gListEl[0].addEventListener('swiperight', previewPrev, false);
        }
        function removeEventPhone(){
           
            Config.gListBdEl[0].removeEventListener('tap', closeGallary, false);
            Config.gListEl[0].removeEventListener('swipeleft', previewNext, false);
            Config.gListEl[0].removeEventListener('swiperight', previewPrev, false);
        }

        /**
        *   向左滑动或者点击右箭头时，查看next图片
        */
        function previewNext() {
        
            var curIndex = $settings.currentIndex,
                imgList = $settings.imgInfo,
                imgLen = Config.gImgLen;
              
           
            if(!Config.pNextImgUrl) {
                return;
            } 
            if($settings.currentIndex<imgLen-1) {
                $settings.currentIndex ++;
                Config.pCurImgUrl = imgList[$settings.currentIndex].url;
                Config.pPrevImgUrl = $settings.currentIndex?imgList[$settings.currentIndex-1].url: '';
                Config.pNextImgUrl = ($settings.currentIndex<imgLen-1)?imgList[$settings.currentIndex+1].url:'';
            }
            var h = $('body').height(),
                w = $('body').width();  
            var imgLis = Config.pContainer.find('li');
            var newLi = $('<li><img /></li>');
             $(imgLis[2]).css('-webkit-transform', 'translateX(0px)').css('-webkit-transition-duration', '.35s');
             $(imgLis[1]).css('-webkit-transform', 'translateX(-'+w+'px)').css('-webkit-transition-duration', '.35s');
            
            $(imgLis[0]).remove();
            newLi.appendTo(Config.pContainer).css('-webkit-transform', 'translateX('+w+'px)').css('-webkit-transition-duration', '.35s');
          
            setImgUrl(1,[Config.pNextImgUrl],2);

        }

    
        function previewPrev() {    
            
            var curIndex = $settings.currentIndex,
                imgList = $settings.imgInfo,
                imgLen = Config.gImgLen;
            if(!Config.pPrevImgUrl) {
                return;
            } 
            if($settings.currentIndex) {
                $settings.currentIndex --;
                Config.pCurImgUrl = imgList[$settings.currentIndex].url;
                Config.pPrevImgUrl = $settings.currentIndex?imgList[$settings.currentIndex-1].url: '';
                Config.pNextImgUrl = ($settings.currentIndex<imgLen-1)?imgList[$settings.currentIndex+1].url:'';
            }
            var h = $('body').height(),
                w = $('body').width();      
            var imgLis = Config.pContainer.find('li');
            var newLi = $('<li><img /></li>');
           
            $(imgLis[0]).css('-webkit-transform', 'translateX(0px)').css('-webkit-transition-duration', '.35s');
            $(imgLis[1]).css('-webkit-transform', 'translateX('+w+'px)').css('-webkit-transition-duration', '.35s');

            $(imgLis[2]).remove();
            
            newLi.prependTo(Config.pContainer).css('-webkit-transform', 'translateX(-'+w+'px)').css('-webkit-transition-duration', '.35s');
            setImgUrl(1,[Config.pPrevImgUrl],0);

        }

        function setImgUrl(len,urls,index){
            var len = len,
                url = urls;
            //len :1 , index:2
            for(var i=0 ;i<(len); i++){
                if(len == 1){
                    var j = index;
                }else{
                    var j = i;
                }
                $('#gallery_p_list img')[j].src = url[i];
                $('#gallery_p_list img')[j].onload = function(){
                    var item = this;
                    $(item).parent('li').css('background-image', 'none');
                };
               
            }
        }
        function imgInitPhone(){
            var ctn = Config.gListEl,
                curIndex = parseInt($settings.currentIndex,10),
                urls = $settings.imgInfo;

            Config.pPrevImgUrl = curIndex > 0 ? urls[curIndex-1].url : '';
            Config.pNextImgUrl = curIndex < (Config.gImgLen-1) ? urls[curIndex+1].url : '';
            Config.pCurImgUrl = urls[curIndex].url;
            var prevImgUrl = Config.pPrevImgUrl,
                nextImgUrl = Config.pNextImgUrl,
                curImgUrl = Config.pCurImgUrl;
            var w = $('body').width(),
                h = $('body').height(); 
            var html = ['<ul id="gallery_p_list">',
                        '<li style="-webkit-transform : translateX(-'+w+'px)"></li>',
                        '<li style="-webkit-transform : translateX(0px)"></li>',
                        '<li style="-webkit-transform : translateX('+w+'px)"></li>',
                     '</ul>'];
            ctn.html(html.join(''));
            Config.pContainer = $('#gallery_p_list');
            
            
            var imgLis = Config.pContainer.find('li');   
            $(imgLis[0]).html(prevImgUrl?('<img src="'+prevImgUrl+'" data-index="'+ (curIndex-1) +'" />'):'');
            $(imgLis[1]).html('<img src="'+curImgUrl+'" data-index="'+ curIndex +'" />');
            $(imgLis[2]).html(nextImgUrl?('<img src="'+nextImgUrl+'" data-index="'+ (curIndex+1) +'" />'):'');

            if(prevImgUrl && nextImgUrl){//前后都有
                setImgUrl(3,[prevImgUrl,curImgUrl,nextImgUrl],0);
            }else{
                if(prevImgUrl){//前有，后面没有
                    setImgUrl(2,[prevImgUrl,curImgUrl],0);
                }else if(nextImgUrl){//后有，前面没有
                    setImgUrl(2,[curImgUrl,nextImgUrl],1);
                }else{//前后，都没有
                    setImgUrl(1,[curImgUrl],0);//这个时候index要传0
                }
            }

        }
        function setSettings(settings){
            $settings = settings;
            return $settings;
        }
        return {
          
            _imgInitPhone : imgInitPhone,
            _initEventPhone : initEventPhone,
            _setSettings : setSettings,
            previewPrev : previewPrev,
            previewNext : previewNext,
            closeGallary : closeGallary
        }
    };
    $.fn.gallery = function(options) {
        //var element = this;
        
       
        var settings = $.extend(true,{
            imgInfo : [],
            currentIndex : 0,
            container : document.body
        },options);
        
        var init = function(){

            if(!G){
                var galleryEl = document.createElement("div"),
                    maskEl = document.createElement("div");
                galleryEl.id = 'gallery';
                maskEl.id = 'gallery-mask';
              
                $(settings.container).append(galleryEl);
                $(settings.container).append(maskEl);
                element = $('#gallery');
                elementMask = $('#gallery-mask');
                elementMask.css('height',$(settings.container).height()+'px');

                G = new Gallery(settings);
                $(element).html(Config.gHTML);
                Config.gListEl = $('#gallery_list');
                Config.gImgLen = settings.imgInfo.length;
                Config.gImgListPreBtn = $('#gallery .pre_Btn');
                Config.gImgListNextBtn = $('#gallery .next_Btn');
                Config.gListBdEl = $('#gallery .bd');
                new Touch(Config.gListBdEl[0]);//初始化touch事件
                new Touch(Config.gListEl[0]);        

            }else{
                G._setSettings(settings);
                element.show();
                elementMask.show();
            }

            G._imgInitPhone();
            G._initEventPhone();
            return G;
            
        };
        var MyGallery = init();
     
        return {
            setPrev : MyGallery.previewPrev,
            setNext : MyGallery.previewNext,
            close : MyGallery.closeGallary
        }
    };
})(Zepto, window, document);