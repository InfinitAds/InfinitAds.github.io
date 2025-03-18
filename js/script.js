document.addEventListener('DOMContentLoaded', function() {
    // 初始化移动端菜单相关元素
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;
    
    // 获取页面所有区块和指示器点
    const sections = document.querySelectorAll('section');
    const pageIndicatorDots = document.querySelectorAll('.page-indicator-dot');
    
    // 页面滚动时更新指示器状态和区块显示
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // 当区块进入视口的1/3时激活
            if (scrollPosition > sectionTop - windowHeight * 2/3) {
                section.classList.add('active');
                
                // 更新对应的指示器点
                const sectionId = section.getAttribute('id');
                pageIndicatorDots.forEach(dot => {
                    if (dot.getAttribute('data-section') === sectionId) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // 点击指示器点时滚动到对应区域
    pageIndicatorDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById(this.getAttribute('data-section'));
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 移动端菜单切换功能
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        
        const bars = mobileMenu.querySelectorAll('.bar');
        if (mobileMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    // 设置移动端菜单相关事件监听
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !e.target.closest('#mobile-menu') && 
                !e.target.closest('#nav-links')) {
                toggleMobileMenu();
            }
        });
    }
    
    // 为所有页内链接添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 联系表单处理
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         const formData = {
    //             name: document.getElementById('name').value,
    //             email: document.getElementById('email').value,
    //             phone: document.getElementById('phone').value,
    //             message: document.getElementById('message').value
    //         };
            
    //         if (validateForm(formData)) {
    //             console.log('Form data:', formData);
    //             alert('Thank you for your message. We will contact you soon!');
    //             this.reset();
    //         }
    //     });
    // }
    
    // // 表单数据验证
    // function validateForm(data) {
    //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    //         alert('Please enter a valid email address');
    //         return false;
    //     }
        
    //     if (data.phone && !/^[\d\s\-+()]+$/.test(data.phone)) {
    //         alert('Please enter a valid phone number');
    //         return false;
    //     }
        
    //     return true;
    // }
    
    // 返回顶部按钮功能
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('visible', window.scrollY > 300);
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 触发首页区块的显示
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
    }
    
    // 初始化第一个指示器点为激活状态
    if (pageIndicatorDots.length > 0) {
        pageIndicatorDots[0].classList.add('active');
    }
    
    // 初始检查一次页面位置以激活可见区块
    window.dispatchEvent(new Event('scroll'));
});