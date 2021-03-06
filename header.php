<!doctype html>

<!--[if lt IE 7]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?> class="no-js rawhide"><!--<![endif]-->

	<head>
		<meta charset="utf-8">

		<?php // force Internet Explorer to use the latest rendering engine available ?>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<title><?php wp_title('--'); ?></title>

		<?php // mobile meta (hooray!) ?>
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1"/>

		<?php // icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
		<link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/library/images/apple-touch-icon.png">
		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
		
		<?php if (is_front_page()) { ?>
		<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/library/images/rawhide-screenshot.jpg" />
		<?php } ?>
		<!--[if IE]>
			<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
		<![endif]-->
		<?php // or, set /favicon.ico for IE10 win ?>
		<meta name="msapplication-TileColor" content="#f01d4f">
		<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/library/images/win8-tile-icon.png">
            <meta name="theme-color" content="#121212">

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

		<?php // wordpress head functions ?>
		<?php wp_head(); ?>
		<?php // end of wordpress head ?>

		<?php // Google Analytics ?>
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-67610736-1', 'auto');
			ga('send', 'pageview');

		</script>
		<?php // end analytics ?>

	</head>

	<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage">

		<a href="#" class="trigger-nav-ov TRIGGER_NAV_OV">
			<span class="ic">
				<span class="bar-1"></span>
				<span class="bar-2"></span>
				<span class="bar-3"></span>
			</span>
		</a>
		<div class="nav-ov NAV_OV">
			<nav role="navigation" itemscope itemtype="http://schema.org/SiteNavigationElement">
				<?php wp_nav_menu(array(
						 'container' => false,                           // remove nav container
						 'container_class' => 'menu cf',                 // class of container (should you choose to use it)
						 'menu' => __( 'The Main Menu', 'bonestheme' ),  // nav name
						 'menu_class' => 'nav top-nav cf',               // adding custom nav class
						 'theme_location' => 'main-nav',                 // where it's located in the theme
						 'before' => '',                                 // before the menu
						   'after' => '',                                  // after the menu
						   'link_before' => '<span>',                            // before each link
						   'link_after' => '</span>',                             // after each link
						   'depth' => 0,                                   // limit the depth of the nav
						 'fallback_cb' => ''                             // fallback function (if there is one)
				)); ?>

			</nav>
		</div>

		<div id="container">

			<header class="header" role="banner" itemscope itemtype="http://schema.org/WPHeader">

				<div id="inner-header" class="wrap cf">

					<?php 
						$siteTitleArray = explode(' ', get_bloginfo('name'));
					?>
					<?php $logoTag = is_front_page() ? 'h1' : 'p'; ?>
					<<?php echo $logoTag; ?> id="logo" class="h1" itemscope itemtype="http://schema.org/Organization">
						<a href="<?php echo home_url(); ?>" rel="nofollow">
							<span class="primary">
							<?php 
								foreach($siteTitleArray as $word) {
									echo '<span>'.$word.' </span>';
								}
							?>
							</span>
							<span class="sub"><?php bloginfo('description'); ?></span>
						</a>
					</<?php echo $logoTag; ?>>

					<?php // if you'd like to use the site description you can un-comment it below ?>

				</div>

			</header>
