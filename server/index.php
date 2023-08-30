<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Creative Portfolio</title>

    <!-- StyleSheets -->
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/custom.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>

    <section class="header">
        <div class="nav">
          <input type="checkbox" id="nav-check">
          <div class="nav-header">
            <div class="nav-title">
              <img src="https://uploads-ssl.webflow.com/60389b56ac16b9defe290a91/60389b56ac16b9af3e290acc_logo-exploration_v2-02-02.svg">
            </div>
          </div>
          <div class="nav-btn">
            <label for="nav-check">
              <img src="https://uploads-ssl.webflow.com/60389b56ac16b9defe290a91/60389b56ac16b9156a290afb_menu_dark.svg" loading="lazy" alt="" class="icon-menu">
            </label>
          </div>
          
              <ul class="nav-list">
                <li><a href="#">About</a></li>
                <li><a href="#">Casting</a></li>
                <li><a href="#">Work with Us</a></li>
              </ul>
            </nav>
        </div>
    </section>


    <div class="intro">

        <h1>Creative Portfolio</h1>
        <p>Narrative powers paid social creative for the world’s leading performance marketers. Hundreds of creatives for your brand each month at a fraction of traditional creative production agencies. </p>
    </div>
    <!-- Isotope Projects Wrapper -->
    <div class="projects-wrapper">
        <?php 
          $content_dir = "content/*";
          
        ?>
        <!-- Project Filtering -->
        <ul id="filterNav" class="filters-list">
            <li data-filter="*" class="active">All Items</li>
            <?php foreach (glob($content_dir, GLOB_ONLYDIR) as $dirname): ?>
              <li data-filter=".<?php echo basename($dirname); ?>"><?php echo ucfirst(basename($dirname)); ?></li>
            
            <?php endforeach; ?>
        </ul>



        
        <!-- Project Items List -->
        <div class="projects-list">
            <?php foreach (glob($content_dir, GLOB_ONLYDIR) as $dirname):
                $videoFiles = glob($dirname . '/*');
                foreach ($videoFiles as $videoFile):?>
                <div class="project-item <?php echo basename($dirname); ?>">
                  <!-- Item Image -->
                  <?php $ext = pathinfo($videoFile, PATHINFO_EXTENSION);
                  if( $ext == 'mp4'): ?>
                    <video playsinline webkit-playsinline playsInline webkit-playsInline loading="lazy" preload="metadata">
                      <source src="<?php echo $videoFile; ?>#t=0.5" type="video/mp4" preload="metadata">
                    </video>
                    <div class="play-button-wrapper">
                      <div title="Play video" class="play-gif" id="circle-play-b">
                        <!-- SVG Play Button -->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
                          <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z" />
                        </svg>
                      </div>
                    </div>
                  <?php else: ?>

                    <img src="<?php echo $videoFile; ?>" alt="Item 1">
                  <?php endif; ?>
                </div>
          

            <?php endforeach;
               endforeach; ?>
        </div>
    </div>


    <div class="footer wf-section">
        <div class="block-footer" style="opacity: 1;">
            <div class="footer-group">
                <div class="brand-footer">
                    <p class="footer-text">© Narrative Ads 2021</p>
                </div>
            </div>
        </div>
    </div>


    <!-- JavaScipts -->
    <script src="js/jquery.min.js"></script>
    <script src="js/isotope.pkgd.min.js"></script>
    <script src="js/functions.js"></script>

</body>
</html>