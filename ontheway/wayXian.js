define(['wayBase'],function(wayBase){
	/**西安子类**/
	function XIAN(){
	    var instance = this; 
	    XIAN = function(){ 
	        return instance; 
	    } 
	    XIAN.prototype = this; 
	    instance = new wayBase.WAY();  
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
	        if(!wayBase.WAYCON.init){
	            wayBase.WAYCON.init = true;
	            instance.page2MainEl.html('');
	            this.ConnectGraph();
	        }
	    }
	    return instance; 
	}
	return XIAN;
});