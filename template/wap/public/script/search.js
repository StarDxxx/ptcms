var PTSV={t:null,ajax:0};$ptm.search={init:function(obj){obj.on('keydown click',function(){$ptm.search.suggest(obj)});$(document).on('tap','.searchsuggest li,.searchhistory a',function(){var key=$(this).html();$ptm.search.go(key)});$('.pt-search-textbtn').on('tap',function(){$ptm.search.go(obj.val())});$(document).on('tap','.searchhistroyclear',function(){$ptm.alert.open({title:'提示',content:'确认清空搜索历史么',okval:'确定',cancelval:'取消',okfunc:function(){$ptm.search.history.clear()}})});$ptm.search.history.init()},history:{init:function(){list=JSON.parse(localStorage.getItem('searchlist'));if(list&&typeof list=='object'){var html='<dt><i class="fa fa-trash searchhistroyclear"><b>清空历史</b></i>搜索历史</dt>';$.each(list,function(k,v){html+='<dd><a class="noicon ptm-text-cut">'+v+'</a></dd>'});$('.searchhistory').html(html)}},add:function(key){var newlist=[];newlist.push(key);list=JSON.parse(localStorage.getItem('searchlist'));if(list&&typeof list=='object'){$.each(list,function(k,v){if(v!=key){newlist.push(v)}});if(newlist.length>6){newlist=newlist.slice(0,6)}}localStorage.setItem('searchlist',JSON.stringify(newlist))},clear:function(){localStorage.setItem('searchlist',JSON.stringify([]))},},go:function(key){if(key){$ptm.search.history.add(key);window.location=basesearchurl+encodeURIComponent(key)}else{$ptm.toast('关键词不能为空')}},suggest:function(obj){if(PTSV.t){clearTimeout(PTSV.t)}PTSV.t=setTimeout(function(){var v=obj.val();if(v){$.get('/api/search/suggest.json',{key:obj.val()},function(res){if(res.status==1){var html='';$.each(res.data,function(k,v){if(k<5){html+='<li>'+res.data[k]+'</li>'}});$('.searchsuggest').show().html(html)}},'json')}else{$('.searchsuggest').hide().html('')}},200)}};