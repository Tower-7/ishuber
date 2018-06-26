$(document).ready(function(){
	$('.nav .pic').click(function(){
		 $('.navTxt ul').animate({opacity:"1"})
		 $('.navTxt .bg').animate({opacity:"1"})
		$('.nav').css('transition','all 3s')
		$('.nav').css({
			'height':'8000px',
			'width':'8000px',
			'top':'-4000px',
			'right':'-4000px',
		})
		$('.nav .navTxt').css('display','block')
		$('.writingArticle').css('display','none')
	})
	$('.nav .navTxt img').click(function(){
		$('.navTxt ul').css('opacity','0')
		$('.navTxt .bg').css('opacity','0')
		$('.nav').css('transition','all 0s')
		$('.nav .navTxt').css('display','none')
		$('.writingArticle').css('display','block')
		$('.nav').css({
			'height':'60px',
			'width':'60px',
			'top':'20px',
			'right':'120px',
		})
	})
})