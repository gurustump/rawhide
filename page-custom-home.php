<?php
/*
 Template Name: Custom Home Page
*/
?>

<?php get_header(); ?>

			<div id="content">

				<main id="main" class="cf" role="main" itemscope itemprop="mainContentOfPage" itemtype="http://schema.org/Blog">
				
				<?php
				$sections = get_posts(
					array(
						'posts_per_page'=>-1,
						'post_type'=>'module',
						'module_cat'=> 'home-page',
						'order' => 'ASC',
						'orderby' => 'meta_value_num',
						'meta_key' => '_rawhide_metabox_section_order'
					)
				);
				//print_r($sections);
				if ( isset($sections[0]) ) {
					foreach($sections as $key => $section) { ?>
						<?php // print_r($section);
						$sectionMeta = get_post_meta($section->ID); 
						// print_r($sectionMeta); 
						?>
						<section class="<?php echo $sectionMeta['_rawhide_metabox_css_class'][0]; ?>" style="background-image:url(<?php echo  $sectionMeta['_rawhide_metabox_bg_image'][0]; ?>);">
							<div class="bg-shell" style="background-image:url(<?php echo  $sectionMeta['_rawhide_metabox_bg_image'][0]; ?>);"></div>
							<div class="section-content">
								<h2><?php echo $section->post_title; ?></h2>
								<?php echo $section->post_content; ?>
							</div>
						</section>
					<?php }
				} ?>
				
<?php /*
					<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

					<article id="post-<?php the_ID(); ?>" <?php post_class( 'cf' ); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">

						<header class="article-header">

							<h1 class="page-title"><?php the_title(); ?></h1>

							<p class="byline vcard">
								<?php printf( __( 'Posted <time class="updated" datetime="%1$s" itemprop="datePublished">%2$s</time> by <span class="author">%3$s</span>', 'bonestheme' ), get_the_time('Y-m-j'), get_the_time(get_option('date_format')), get_the_author_link( get_the_author_meta( 'ID' ) )); ?>
							</p>


						</header>

						<section class="entry-content cf" itemprop="articleBody">
							<?php
								// the content (pretty self explanatory huh)
								the_content();

							?>
						</section>


						<footer class="article-footer">


						</footer>


					</article>

					<?php endwhile; else : ?>

							<article id="post-not-found" class="hentry cf">
									<header class="article-header">
										<h1><?php _e( 'Oops, Post Not Found!', 'bonestheme' ); ?></h1>
								</header>
									<section class="entry-content">
										<p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'bonestheme' ); ?></p>
								</section>
								<footer class="article-footer">
										<p><?php _e( 'This is the error message in the page-custom.php template.', 'bonestheme' ); ?></p>
								</footer>
							</article>

					<?php endif; ?>
*/ ?>
				</main>

			</div>


<?php get_footer(); ?>
