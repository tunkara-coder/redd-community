// Language translations for login page only
const loginTranslations = {
    english: {
        chooseLanguage: "Choose Your Language",
        usernameLabel: "Username",
        passwordLabel: "Password", 
        loginText: "Login to Community Portal",
        helpText: "Need help logging in? Contact your community leader",
        securityText: "Your community data is secure and protected",
        previewTitle: "Community Benefits Overview",
        loginSubtitle: "Community Transparency Platform"
    },
    mandinka: {
        chooseLanguage: "I ka diɲa daa sani",
        usernameLabel: "Donto tɔgɔ",
        passwordLabel: "Donto sirilu",
        loginText: "Donta Siti Portal kaŋ", 
        helpText: "I ka donto la kuwo la jarabi? I si a lafita siti kuntigi la",
        securityText: "I si siti data senuŋ, a lafita hame",
        previewTitle: "Siti Benefisiw Laada",
        loginSubtitle: "Siti Dimbayaŋo Laada Platform"
    },
    wolof: {
        chooseLanguage: "Tànn làkkuw yaw",
        usernameLabel: "Tur wi nga tudd",
        passwordLabel: "Kodu gu",
        loginText: "Dugg ci Platform bu Community bi",
        helpText: "Soo am problema ci duggu, waxtaan ak borom community bi",
        securityText: "Xibaar yi nga def ci anam gu wér la", 
        previewTitle: "Xoolal Benefis yi",
        loginSubtitle: "Platform bu Wone Bu Community bi"
    },
    fulla: {
        chooseLanguage: "Suɓo ɗemngal maa",
        usernameLabel: "Innde",
        passwordLabel: "Ɗenngu",
        loginText: "Naatu to Portal Community",
        helpText: "Aɗa sokli e naatude? Ɗaɓɓitano laamiiɗo community maa",
        securityText: "Keɓe maa community en ceeɗii, en hisnote",
        previewTitle: "Yiyde Ɗaɓɓe Community",
        loginSubtitle: "Hollirde Community Platform"
    }
};

// Current language state
let currentLanguage = 'english';

// DOM Elements
const languageOptions = document.querySelectorAll('.lang-option');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');

// Initialize the login page
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
});

// Initialize login page functionality
function initializeLoginPage() {
    // Set up language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLoginLanguage(lang);
            
            // Update active state
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    // Add some interactive animations
    addLoginAnimations();

    // Test: Auto-fill for easier testing (remove in production)
    usernameInput.value = 'community';
    passwordInput.value = 'redd2024';
}

// Switch language for login page
function switchLoginLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.setAttribute('data-language', lang);
    
    const translation = loginTranslations[lang];
    
    // Update all translatable elements
    Object.keys(translation).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translation[key];
            } else {
                element.textContent = translation[key];
            }
        }
    });
}

// Handle login process
function handleLogin() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    console.log('Login attempt:', { username, password });
    
    // Accept ANY input - even empty strings
    // Show loading state
    const originalHTML = loginButton.innerHTML;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    loginButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username || 'Community Member');
        localStorage.setItem('language', currentLanguage);
        
        console.log('Login successful, redirecting...');
        
        // Redirect to main application
        window.location.href = 'index.html';
    }, 1000);
}

// Add interactive animations to login page
function addLoginAnimations() {
    // Add hover effects to language options
    languageOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click effect to login button
    loginButton.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    loginButton.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
}

// Check if user is already logged in (redirect if true)
function checkExistingLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }
}

// Run check on page load
checkExistingLogin();