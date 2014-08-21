function PageSwitcher(){
    var currentPage,
        stateHistory = [],
        stateTree = [];
    this.switchPage = function(){
        var hisLen = stateHistory.length,
            treeLen = stateTree.length,
            state = window.location.hash,
            j = -1,k=-1;

        for(var i=0 ;i<hisLen ;i++){
            if(state == stateHistory[i]){
                j = i;
                break;   
            }
        }
        for(var i=0;i<treeLen;i++){
            if(state == stateTree[i]){
                k = i;
                break;
            }
        }
        
        if(j !== -1){//the previous page
            for(var i=j;i<hisLen-1;i++){
                page = currentPage.prev('.page');
                if(page && page.length > 0){
                    currentPage.attr('class','page transition right100');
                    currentPage = page;
                    stateHistory.pop();
                }
            }
        }else{//the next page
            for(var i=0; i<k; i++){
                page = currentPage.next('.page');
                if(page && page.length > 0){
                    stateHistory.push(stateTree[hisLen+i]);
                    page.attr('class','page transition center');
                    currentPage = page;
                }
            }
            
        }
    },  
    this.gotoPrevPage = function(){
        page = currentPage.prev('.page');
        if(page && page.length > 0){
            currentPage.attr('class','page transition right100');
            currentPage = page;
            stateHistory.pop();
        }
    },
    this.gotoNextPage = function(){
        var hisLen = stateHistory.length;
        page = currentPage.next('.page');
        if(page && page.length > 0){
            stateHistory.push(stateTree[hisLen+1]);
            page.attr('class','page transition center');
            currentPage = page;
        }
    },
    this.init = function(obj){
        
        stateTree= obj.hashs;
        var start = 0;
        for(var i=0; i<stateTree.length ;i++){
            if(stateTree[i] === obj.curHash){
                start = 1;
                currentPage = $($('.switch-page-main .page')[i]).addClass('current');
                page = currentPage;
                stateHistory.push(stateTree[i]);
            }
            if(start == 1){
                page = page.next('.page');
                if(page && page.length > 0){
                    page.attr('class','page transition right100');
                }
            }else{
                stateHistory.push(stateTree[i]);
            }
        }
    }
}
/*
 * 侧边栏
 */
PageSwitcher.prototype.sideStateArr = [];
PageSwitcher.prototype.sideSlide = function(el){
    this.dir = 'right30';
    this.reverseDir = 'left30';
    this.el = el ? el : '.switch-page-main';
    var self = this;
    if(self.sideStateArr.length == 0){
        $(self.el).addClass('page transition '+self.dir);
        self.sideStateArr.push(self.reverseDir);
    }else{
        $(self.el).removeClass(self.dir);
        $(self.el).addClass('center');
        self.sideStateArr.pop();
    }
}