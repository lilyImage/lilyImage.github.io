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
    //其他初始化 
    instance.start = function(){
        instance.page2MainEl.html('');
        if(!WAYCON.init){
            WAYCON.init = true;
            var width = $(window).width()-20,height=$(window).height()-50;
            var svg = d3.select(".page2-content").append("svg")
                       .attr("width", width)
                       .attr("height", height)
                       .attr("class","xian");
            var color = d3.scale.category20();
            var force = d3.layout.force()
                .charge(-200)
                .linkDistance(30)
                .size([width, height]);

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
        }
        
    }
    return instance; 
}