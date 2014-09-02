/**全局变量**/
var WAYCON = (function(){
  return {
     init : false
  }
})();

/**父类*/
function WAY(){
   this.page2MainEl = $('.page2-content');
}
WAY.prototype.start = function() {
  WAYCON.init = false;
  this.page2MainEl.html('<div>敬请期待</div>');
};    
/**西安子类**/
function XIAN(){
    var instance = this; 
    XIAN = function(){ 
        return instance; 
    } 
    XIAN.prototype = this; 
    instance = new WAY();  
    instance.constructor = XIAN; 
    /**绘制家庭关系图*/
    instance.ConnectGraph = function(){
        var width = $(window).width()-20,height=$(window).height()-50;
        var svg = d3.select(".page2-content").append("svg")
                   .attr("width", width)
                   .attr("height", height)
                   .attr("class","xian");
        var color = d3.scale.category20();
        var force = d3.layout.force()
            .charge(-80)
            .linkDistance(10)
            .size([width-10, height-10]);

        d3.json("cp.json", function(error, graph) {
          force
              .nodes(graph.nodes)
              .links(graph.links)
              .start();

          var link = svg.selectAll(".link")
              .data(graph.links)
              .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", function(d) { return Math.sqrt(d.value); });

          var node = svg.selectAll(".node")
              .data(graph.nodes)
              .enter().append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .style("fill", function(d) { return color(d.group); })
              .call(force.drag);

          node.append("title")
              .text(function(d) { return d.name; });
          
          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
          });
        });
    };
    /**覆盖start事件**/
    instance.start = function(){
        if(!WAYCON.init){
            WAYCON.init = true;
            instance.page2MainEl.html('');
            this.ConnectGraph();
        }
    }
    return instance; 
}
/**台湾子类*/
function TAIWAN(){
    var instance = this; 
    TAIWAN = function(){ 
        return instance; 
    } 
    TAIWAN.prototype = this; 
    instance = new WAY();  
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
        if(!TAIWAN.init){
            TAIWAN.init = true;
            instance.page2MainEl.html(mainHtml);
            var els = document.getElementsByTagName('li');
            for(var i=0; i<els.length ;i++){
              new Touch(els[i]);
              els[i].addEventListener('tap',function(e){
                var item = $(this).data('index');
                $('#gallery').gallery({
                    imgInfo : Images,
                    currentIndex : item
                });
              },false);
            }
        }
    }
    return instance;
}