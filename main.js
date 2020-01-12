var menuHeight = 0, menuPadding = 0;

$(document).ready(function()
{
	if ($('.main .main_left').length)
	{
		height_left_menu();
		
		$(window).resize(function()
		{
			height_left_menu();
		});
	}
});

function height_left_menu()
{
	if (menuHeight == 0)
	{
		menuHeight = $('.main .main_left').height();
		menuPadding = $('.main .main_left').css('paddingBottom').split('px').join('') * 1;
	}
	var windowHeight = $(window).height();
	
	$('.main .main_left').height(windowHeight);
	
	var height_menu = windowHeight - (77 + 64);
	
	$('.main .main_left_menu').height(height_menu);
	
	var windowWidth = $(window).width();

	if (windowWidth < 900)
	{
		$('.main').removeClass('width1024 width1280').addClass('width1024');
	}
	else if (windowWidth < 1200)
	{
		$('.main').removeClass('width1024 width1280').addClass('width1024');
	}
	else if (windowWidth < 1500)
	{
		$('.main').removeClass('width1024 width1280').addClass('width1280');
	}
	else
	{
		$('.main').removeClass('width1024 width1280');
	}
}

function fc_hide_left_menu()
{
	if($('.main').hasClass('mini') == false)
	{
		$('.main').addClass('mini');
		$.cookie("menu_mini", "1", { expires : 365, path: '/' });
	}
}

function toggle_hide_left_menu()
{
	if ($('.main').hasClass('mini'))
	{
		$('.main').removeClass('mini');
		
		$.cookie("menu_mini", "0", { expires : 365, path: '/' });
	}
	else
	{
		$('.main').addClass('mini');
		
		$.cookie("menu_mini", "1", { expires : 365, path: '/' });
	}
}
