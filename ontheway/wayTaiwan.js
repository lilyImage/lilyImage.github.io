define(['wayBase','touchEvent','mg'],function(wayBase){
	/**台湾子类*/
	function TAIWAN(){
	    var instance = this; 
	    TAIWAN = function(){ 
	        return instance; 
	    } 
	    TAIWAN.prototype = this; 
	    instance = new wayBase.WAY();  
	    instance.constructor = TAIWAN; 

	    var Images = [
	      {url : 'http://p6.qhimg.com/t019875709696b69d86.jpg'},
	      {url : 'http://p4.qhimg.com/t01174ebc4950fa217d.jpg'},
	      {url : 'http://p6.qhimg.com/t0133499eee6e798d75.jpg'},
	      {url : 'http://p4.qhimg.com/t01e7d38f5ad6688577.jpg'},
	      {url : 'http://p1.qhimg.com/t01c96ad218a4b9eda5.jpg'},
	      {url : 'http://p2.qhimg.com/t01032f593431942074.jpg'},
	      {url : 'http://p7.qhimg.com/t01d78d7765acd215cc.jpg'},
	      {url : 'http://p6.qhimg.com/t01b1ae53c9076a5a3b.jpg'},
	      {url : 'http://p8.qhimg.com/t0195691effa60705f3.jpg'},
	      {url : 'http://p2.qhimg.com/t0108a9ea3b517998ed.jpg'}
	    ];
	    /*大图预览**/
	    var mainHtml = '<div class="taiwan-content"><ul>';
	    for(var i=0; i<Images.length; i++){
	        mainHtml += '<li data-index="'+i+'"><img src="'+Images[i].url+'" /></li>';
	    }
	    mainHtml += '</ul></div>';
	    instance.start = function(){
	    	
	        if(!wayBase.WAYCON.init){
	            wayBase.WAYCON.init = true;
	            instance.page2MainEl.html(mainHtml);
	            var els = $('.taiwan-content li');
	            for(var i=0; i<els.length ;i++){
	                $(els[i]).on('tap',function(e){
	            		var item = $(this).data('index');
		                myGallery({
		                    imgInfo : Images,
		                    currentIndex : item
		                });
	            	});
	            }
	        }
	    }
	    return instance;
	}
	return TAIWAN;
});