$(function(){
	/*全局函数处理 */
	var jfjb = {

/**************************************************************************************************************/
/*  对象私有变量
***************************************************************************************************************/
		//首页视频变量
		video_01           :   $('#video-index'),
		timeDrag_1         :   false,
		progress_1         :   $('#progressBar-1'),
		video_star_1       :   $('#video-play-1'),
		video_button_1     :   $('#but-1'),
		duration_1         :   $('#duration-1'),
		timeBar_1          :   $('#timeBar-1'),
		current_time_1     :   $('#current-1'),
		//军报每天读变量
		video_02           :   $('#video-read'),
		timeDrag_2         :   false,
		progress_2         :   $('#progressBar-2'),
		video_star_2       :   $('#video-play-2'),
		video_button_2     :   $('#but-2'),
		duration_2         :   $('#duration-2'),
		timeBar_2          :   $('#timeBar-2'),
		current_time_2     :   $('#current-2'),
		// 全局变量
		begin_style        :   'glyphicon glyphicon-play f-White',
		end_style          :   'glyphicon glyphicon-pause f-White',

/**************************************************************************************************************/
/*  关联处理函数
***************************************************************************************************************/
		//视频通用方法
		video_begin : function(video,timeDrag,progress,video_star,video_button,durationT,timeBar,current_time){
			// var video = videoBegin;
			$('.video-ul div').eq(0).removeClass("dd")
			//计算视频播放时间分钟数
			video.on('loadedmetadata', function() {
				var second = Math.floor(video[0].duration % 60);    
		        var minite = Math.floor((video[0].duration / 60) % 60);
		        if(minite < 10){ 
					minite = "0" + minite; 
				} 
				if(second < 10){ 
					second = "0" + second; 
				}
			   	durationT.text(minite+':'+second);
			});
			 
			//计算视频总共时间
			video.on('timeupdate', function() {
				var second = Math.floor(video[0].currentTime % 60);    
		        var minite = Math.floor((video[0].currentTime / 60) % 60);
		        if(minite < 10){ 
					minite = "0" + minite; 
				} 
				if(second < 10){ 
					second = "0" + second; 
				}
			   	current_time.text(minite+':'+second);
			   	var currentPos = video[0].currentTime; 
				var maxduration = video[0].duration; 
				var percentage = 100 * currentPos / maxduration;
				timeBar.css('width', percentage+'%');
			});

			//根据视频播放时间计算滚动条长度 
			progress.mousedown(function(e) {
			   timeDrag = true;
			   updatebar(e.pageX);
			});
			$(document).mouseup(function(e) {
			   if(timeDrag) {
			      timeDrag = false;
			      updatebar(e.pageX);
			   }
			});
			$(document).mousemove(function(e) {
			   if(timeDrag) {
			      updatebar(e.pageX);
			   }
			});
			var updatebar = function(x) {
			   var maxduration = video[0].duration; 
			   var position = x - progress.offset().left; 
			   var percentage = 100 * position / progress.width();
			   if(percentage > 100) {
			      percentage = 100;
			   }
			   if(percentage < 0) {
			      percentage = 0;
			   }
			 
			   //Update progress bar and video currenttime
			   timeBar.css('width', percentage+'%');
			   video[0].currentTime = maxduration * percentage / 100;
			};


			//点击播放大按钮开始播放视频
			video_star.on('click',function(){
		       	video[0].play();
		       	video_star.hide();
		       	video_button.removeClass(jfjb.begin_style)
		       	video_button.addClass(jfjb.end_style)
		    });

		    //点击播放小按钮开始视频，停止视频播放
		    video_button.on('click',function(){
		    	if(video[0].paused) {
			       	video[0].play();
			       	video_star.hide();
			       	video_button.removeClass(jfjb.begin_style)
			       	video_button.addClass(jfjb.end_style)
			    }else{
			       	video[0].pause();
		       		video_star.show();
			       	video_button.removeClass(jfjb.end_style)
			       	video_button.addClass(jfjb.begin_style)
			    }
			    return false;
		    });

		    //监听视频是否播放完成，完成后将停止播放的样式显示
		    if(video.length!=0){
				video[0].addEventListener('ended', switchNextVideo, true);
			}
			function switchNextVideo(){
		       	video_button.removeClass(jfjb.end_style)
		       	video_button.addClass(jfjb.begin_style)
		       	video_star.show();
		       	timeBar.css('width', 0+'%');
		       	current_time.text('00:00');
				var v_img = video.attr('poster');
				video["src"] = video.attr('src');
				video.load();
				video.attr('poster',v_img)
				video[0].pause();
			}
		},
		//首页视屏功能
		video_index : function(){
			var timeDrag1 = jfjb.timeDrag_1;
			var progress1 = jfjb.progress_1;
			var video_star1 = jfjb.video_star_1;
			var video_button1 = jfjb.video_button_1;
			var duration1 = jfjb.duration_1;
			var timeBar1 = jfjb.timeBar_1;
			var current_time1 = jfjb.current_time_1;
			var video1 = jfjb.video_01;
	       	jfjb.video_button_1.removeClass(jfjb.end_style)
	       	jfjb.video_button_1.addClass(jfjb.begin_style)
	       	jfjb.video_star_1.show();
	       	jfjb.timeBar_1.css('width', 0+'%');
			jfjb.video_begin(video1,timeDrag1,progress1,video_star1,video_button1,duration1,timeBar1,current_time1);
			jfjb.video_01["src"] = jfjb.video_01.attr('src');
			jfjb.video_01.load();
		},
		//军报每天读视屏功能
		video_read : function(){
			var timeDrag2 = jfjb.timeDrag_2;
			var progress2 = jfjb.progress_2;
			var video_star2 = jfjb.video_star_2;
			var video_button2 = jfjb.video_button_2;
			var duration2 = jfjb.duration_2;
			var timeBar2 = jfjb.timeBar_2;
			var current_time2 = jfjb.current_time_2;
			var video2 = jfjb.video_02;
			jfjb.video_02["src"] = jfjb.video_02.attr('src');
			jfjb.video_02.load();
	       	jfjb.video_button_2.removeClass(jfjb.end_style)
	       	jfjb.video_button_2.addClass(jfjb.begin_style)
	       	jfjb.video_star_2.show();
	       	jfjb.timeBar_2.css('width', 0+'%');
			jfjb.video_begin(video2,timeDrag2,progress2,video_star2,video_button2,duration2,timeBar2,current_time2);
		},
		//军报每天读 点击右侧图片加重新加载视频并播放功能
		video_choose : function(){
			$('.video-ul li').on('click',function(){
				var v_img1 = $(this).attr('value');
				$('#video-read').attr('poster',v_img1)
				var v_video = $(this).attr('name');
				var v_title = $(this).attr('title');
				$('.video-begin h3').text(v_title)
				$('.video-ul div').addClass("dd")
				$(".video-ul div").eq($(this).index()).removeClass("dd"); 
				$('#video-read').attr('src',v_video);
			    $('#video-play-2').hide();
		       	$('#but-2').removeClass("glyphicon glyphicon-play f-White")
		       	$('#but-2').addClass("glyphicon glyphicon-pause f-White")
				$('#video-read').load();
				$('#video-read').attr('autoplay', "true"); 
			});
		},
		//微博图九宫格
		weibo_img : function(){
			$(".weibo-list ul").each(function(i){
		      	var boxli = $(this).find("li").length
		      	var ulid = 'box-'+i;
		      	var divid = 'div-'+i;
		      	var boxulid = $('.weibo-list ul').eq(i).attr('id',ulid)
		      	var boxbivid = $('.weibo-list div').eq(i).attr('id',divid)
				if(boxli == 1){
					$('#box-'+i+' img').attr({width:"260",height:"120"});
				}else if(boxli == 2){
					$('#box-'+i+' img').attr({width:"125",height:"120"});
				}else if(boxli == 4){
					$('#box-'+i+' img').attr({width:"125",height:"80"});
				}else{
					$('#box-'+i+' img').attr({width:"80",height:"80"});
				}
				//点击小图片显示放大后的图片
				$('#box-'+i+' img').on('click',function(){
					var imgurl = $(this).attr('src')
					$('.box-big').hide();
					$('.boxul').show();
					$('#div-'+i+'').eq($(this).index()).show();
					$('#box-'+i+'').eq($(this).index()).hide();
					$('#div-'+i+'').eq($(this).index()).html('<h3 class="glyphicon glyphicon-remove" id="box_close'+i+'"></h3><img src="'+imgurl+'">');
					$('#box_close'+i+'').eq($(this).index()).on('click',function(){
						$('.boxul').show();
						$('.box-big').hide();	
					})
				})
				
		    });
		},
		//阅读报纸功能
		readnewspaper : function(title1,value1){
			var chapter = title1;
			var pages = null;
			if(value1==null || value1==""){
				pages = '01';
			}else{
				pages = value1;
			}
			// alert(pages)
			$('#pages span').text(pages)
			$('#chapter span').text(chapter)
			var imgsrc = 'newspaper'+'/'+chapter+'/'+pages+'.jpg'
			$('#readnewspaper img').attr('src',imgsrc)
			//点击日期选择刊号
			$('#chapter li').on('click',function(){
				var issn = $(this).attr('value');
				var version = '01';
				$('#chapter span').text(issn);
				$('#pages span').text(version);
				var issnsrc = 'newspaper'+'/'+issn+'/'+version+'.jpg';
				$('#readnewspaper img').attr('src',issnsrc);
			})
			//点击版面选择版面号
			$('#pages li').on('click',function(){
				var version1 = $(this).attr('name');
				var issn1 = $('#chapter span').text();
				$('#pages span').text(version1);
				var issnsrc1 = 'newspaper'+'/'+issn1+'/'+version1+'.jpg';
				$('#readnewspaper img').attr('src',issnsrc1);
			})

		},
		//点击导航选择要显示的模块
		selectmodule : function(){
			//隐藏模块
			$('#jfjb-video').hide();
			$('#jfjb-weibo').hide();
			$('#jfjb-weixin').hide();
			$('#jfjb-paper').hide();
			$('#jfjb-weixin').hide();
			$('#jfjb-overview').hide();
			$('#jfjb-readfooter').hide();
			$('#jfjb-readnewspaper').hide();

			//显示首页模块 其他模块隐藏
			$('#index').on('click',function(){
				jfjb.video_01[0].pause();
				jfjb.video_02[0].pause();
				$('#jfjb-video').hide();
				$('#jfjb-weibo').hide();
				$('#jfjb-weixin').hide();
				$('#jfjb-paper').hide();
				$('#jfjb-overview').hide();
				$('#jfjb-readfooter').hide();
				$('#jfjb-readnewspaper').hide();
				$('#jfjb-index').show();
				$('#jfjb-footer').show();
				$('#jfjb-readfooter').hide();
		       	jfjb.video_button_1.removeClass(jfjb.end_style)
		       	jfjb.video_button_1.addClass(jfjb.begin_style)
		       	jfjb.video_star_1.show();
		       	jfjb.timeBar_1.css('width', 0+'%');
				jfjb.video_01["src"] = jfjb.video_01.attr('src');
				jfjb.video_01.load();
			})
			//显示军报每天读模块 其他模块隐藏
			$('#video').on('click',function(){
				jfjb.video_01[0].pause();
				jfjb.video_02[0].pause();
				$('#jfjb-video').show();
				$('#jfjb-index').hide();
				$('#jfjb-weibo').hide();
				$('#jfjb-weixin').hide();
				$('#jfjb-paper').hide();
				$('#jfjb-readfooter').hide();
				$('#jfjb-readnewspaper').hide();
				$('#jfjb-overview').hide();
				$('#jfjb-footer').show();
				$('#jfjb-readfooter').hide();
				jfjb.video_02["src"] = jfjb.video_02.attr('src');
				jfjb.video_02.load();
		       	jfjb.video_button_2.removeClass(jfjb.end_style)
		       	jfjb.video_button_2.addClass(jfjb.begin_style)
		       	jfjb.video_star_2.show();
		       	jfjb.timeBar_2.css('width', 0+'%');
			})
			//显示微博模块 其他模块隐藏
			$('#weibo').on('click',function(){
				jfjb.video_01[0].pause();
				jfjb.video_02[0].pause();
				$('#jfjb-video').hide();
				$('#jfjb-index').hide();
				$('#jfjb-weibo').show();
				$('#jfjb-weixin').hide();
				$('#jfjb-paper').hide();
				$('#jfjb-readfooter').hide();
				$('#jfjb-readnewspaper').hide();
				$('#jfjb-overview').hide();
				$('#jfjb-footer').show();
				$('#jfjb-readfooter').hide();
			})
			//显示微信模块 其他模块隐藏
			$('#weixin').on('click',function(){
				jfjb.video_01[0].pause();
				jfjb.video_02[0].pause();
				$('#jfjb-video').hide();
				$('#jfjb-index').hide();
				$('#jfjb-weibo').hide();
				$('#jfjb-paper').hide();
				$('#jfjb-weixin').show();
				$('#jfjb-overview').hide();
				$('#jfjb-readfooter').hide();
				$('#jfjb-readnewspaper').hide();
				$('#jfjb-footer').show();
				$('#jfjb-readfooter').hide();
			})
			//显示微信模块 其他模块隐藏
			$('#newspaper').on('click',function(){
				jfjb.video_01[0].pause();
				jfjb.video_02[0].pause();
				$('#jfjb-video').hide();
				$('#jfjb-index').hide();
				$('#jfjb-weibo').hide();
				$('#jfjb-weixin').hide();
				$('#jfjb-paper').show();
				$('#jfjb-overview').hide();
				$('#jfjb-readfooter').hide();
				$('#jfjb-readnewspaper').hide();
				$('#jfjb-footer').show();
				$('#jfjb-readfooter').hide();
			})
			//显示微信模块 其他模块隐藏
			$('#overview').on('click',function(){
				jfjb.video_01[0].pause();
				jfjb.video_02[0].pause();
				$('#jfjb-video').hide();
				$('#jfjb-index').hide();
				$('#jfjb-weibo').hide();
				$('#jfjb-weixin').hide();
				$('#jfjb-paper').hide();
				$('#jfjb-overview').show();
				$('#jfjb-readfooter').hide();
				$('#jfjb-readnewspaper').hide();
				$('#jfjb-footer').show();
				$('#jfjb-readfooter').hide();
			})
			//点击今日报纸，显示阅读的报纸
			$('#jfjb-daynewspaper div').on('click',function(){
				$('#jfjb-video').hide();
				$('#jfjb-index').hide();
				$('#jfjb-weibo').hide();
				$('#jfjb-weixin').hide();
				$('#jfjb-paper').hide();
				$('#jfjb-overview').hide();
				$('#jfjb-footer').hide();
				$('#jfjb-footer').show();
				$('#jfjb-footer').hide();
				$('#jfjb-readfooter').show();
				$('#jfjb-readnewspaper').show();
				var title = $(this).attr('title');
				var value = $(this).attr('value');
				jfjb.readnewspaper(title,value);
			})
			//点击报纸，选择要看的刊号
			$('#jfjb-oldnewspaper div').on('click',function(){
				$('#jfjb-video').hide();
				$('#jfjb-index').hide();
				$('#jfjb-weibo').hide();
				$('#jfjb-weixin').hide();
				$('#jfjb-paper').hide();
				$('#jfjb-overview').hide();
				$('#jfjb-footer').hide();
				$('#jfjb-readfooter').show();
				$('#jfjb-readnewspaper').show();
				var title = $(this).attr('title');
				jfjb.readnewspaper(title);
			})
			//启动视频
			jfjb.video_index();
			jfjb.video_read();
		},
		//微信功能
		selectweixin : function(){
			//今日微信功能
			$('#weixin-day li').on('click',function(){
				var link = $(this).attr('value');
				$('.opt-img img').attr('src',link)
				$('.opt-img').scrollTop(0);
			})
			//微信换一换
			
		},
		
		//初始化
		init : function(){
			jfjb.selectmodule();
			jfjb.selectweixin();
			jfjb.video_choose();
			jfjb.weibo_img();
		}
	};
	jfjb.init();
})