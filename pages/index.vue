<script setup>
import { Icon } from "@iconify/vue";
const activeSection = ref("home");
import emailjs from "emailjs-com";
const isMobile = ref(false);
const showMenu = ref(false);

const projects = [
  {
    name: "Event Management system",
    image: "/image/event.png",
    vercel: "https://book-rent-frontend.vercel.app/",
    git: "",
    languages: ["Vue.js", "tailwind", "GO", "Nuxt 3", "postgresql"],
  },
  {
    name: "Book Rent system",
    image: "/image/book.png",
    vercel: "https://book-rent-frontend.vercel.app/",
    git: "https://github.com/kid3234/book-rent-frontend",
    languages: ["React.js", "tailwind", "node.js", "postgresql"],
  },
  {
    name: "Guddummalle",
    image: "/image/gudumale.png",
    vercel: "https://book-rent-frontend.vercel.app/",
    git: "",
    languages: ["Next.js", "tailwind", "node.js", "mongodb"],
  },
];
const isdark = ref(true);

const toggleMenu = () => {
  console.log("clicked");

  showMenu.value = !showMenu.value;
};
const toggleDark = () => {
  isdark.value = !isdark.value;
};
const checkMobile = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.matchMedia("(max-width: 768px)").matches;
  }
};

const isScrollingDown = ref(true);
let lastScrollY = 0;

const updateActiveSection = () => {
  const sections = document.querySelectorAll('[id^="section"]');
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  console.log("sections", sections);

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
      activeSection.value = section.id;
    }
  });
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isScrollingDown.value = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;
  updateActiveSection();
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { root: null, threshold: 0.5 }
  );

  const sections = document.querySelectorAll('[id^="section"]');
  sections.forEach((section) => observer.observe(section));

  checkMobile();

  window.addEventListener("resize", checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});

const email = ref("");
const message = ref("");

const sendEmail = (event) => {
  event.preventDefault();

  const templateParams = {
    from_email: email.value,
    message: message.value,
  };
  const runtimeConfig = useRuntimeConfig();

  emailjs
    .send(
      runtimeConfig.public.SERVICEID,
      runtimeConfig.public.TEMPLATEID,
      templateParams,
      runtimeConfig.public.PUBLICKEY
    )
    .then(
      (response) => {
        alert("Message sent successfully!");
        console.log("Success:", response.status, response.text);
      },
      (error) => {
        alert("Failed to send the message. Please try again later.");
        console.error("Error:", error);
      }
    );
};
</script>

<template>
  <div
    :class="{ 'bg-white': !isdark }"
    class="bg-slate-900 text-white min-w-[100vw] min-h-screen scroll-smooth p-4 pt-10 relative overflow-x-hidden"
  >
    <div
      @click="toggleMenu"
      v-if="showMenu"
      :class="{ 'bg-[#000000]': isdark, 'bg-[#565656]': !isdark }"
      class="w-full h-screen fixed inset-0 z-40 bg-opacity-50 pt-4"
    >
      <div
        @click.stop
        class="relative w-5/6 m-auto flex flex-col gap-4 justify-start items-start p-2 rounded-lg z-50"
        :class="{
          'bg-[#000000]': isdark,
          'bg-[#e3e3e3] text-gray-700': !isdark,
        }"
      >
        <div
          @click="toggleMenu"
          class="absolute top-2 right-2 cursor-pointer outline-double rounded-lg"
          :class="{
            'outline-slate-400': isdark,
            'text-black outline-slate-800': !isdark,
          }"
        >
          <Icon icon="material-symbols:close" width="30" height="30" />
        </div>
        <p class="text-lg font-bold">Navigation</p>

        <a
          class="transition-all duration-300 cursor-pointer"
          @click.prevent="
            activeSection = 'home';
            $scrollTo('#home', 500);
            toggleMenu();
          "
        >
          Home
        </a>
        <a
          class="transition-all duration-300 cursor-pointer"
          @click.prevent="
            activeSection = 'about';
            $scrollTo('#about', 500);
            toggleMenu();
          "
        >
          About
        </a>
        <a
          class="transition-all duration-300 cursor-pointer"
          @click.prevent="
            activeSection = 'projects';
            $scrollTo('#projects', 500);
            toggleMenu();
          "
        >
          Projects
        </a>
        <a
          class="transition-all duration-300 cursor-pointer"
          @click.prevent="
            activeSection = 'experience';
            $scrollTo('#experience', 500);
            toggleMenu();
          "
        >
          Experience
        </a>
        <a
          class="transition-all duration-300 cursor-pointer"
          @click.prevent="
            activeSection = 'contact';
            $scrollTo('#contact', 500);
            toggleMenu();
          "
        >
          Get in touch
        </a>
      </div>
    </div>

    <div
      @click="toggleDark"
      :class="{ ' right-1/4 top-10 ': isMobile, 'bottom-5 ': !isMobile }"
      class="fixed cursor-pointer p-2 bg-gray-200 rounded-full w-10 h-10 flex items-center z-20"
      v-if="!isdark"
    >
      <Icon icon="circum:dark" width="40" height="40" style="color: black" />
    </div>

    <div
      @click="toggleDark"
      :class="{ ' right-1/4 top-10 ': isMobile, 'bottom-5 ': !isMobile }"
      class="fixed cursor-pointer p-2 bg-slate-800 rounded-full w-10 h-10 flex items-center z-20"
      v-if="isdark"
    >
      <Icon icon="ix:light-dark" width="40" height="40" style="color: #fff" />
    </div>

    <div
      v-if="isMobile"
      class="cursor-pointer relative w-full flex justify-center z-20"
    >
      <div
        @click="toggleMenu"
        :class="{
          ' bg-slate-800 text-white': isdark,
          'bg-gray-200  text-black': !isdark,
        }"
        class="fixed top-10 left px-4 py-2 flex gap-2 rounded-2xl items-center justify-center"
      >
        <p>Menu</p>
        <Icon icon="formkit:down" width="26" height="26" />
      </div>
    </div>

    <div v-if="!isMobile" class="w-full fixed top-0 flex py-8 z-40">
      <div
        :class="{ 'bg-gray-100': !isdark, 'bg-slate-800 ': isdark }"
        class="w-fit px-4 py-1 rounded-full m-auto flex justify-center gap-10 items-center"
      >
        <a
          :class="{
            ' px-4 p-2 rounded-full bg-slate-700 transition-all duration-300':
              activeSection === 'home' && isdark,
            ' px-4 p-2 rounded-full bg-gray-200 transition-all duration-300':
              activeSection === 'home' && !isdark,
            'px-4 py-2 cursor-pointer  transition-all':
              activeSection !== 'home',
            'text-black ': !isdark,
            'text-white hover:text-gray-100': isdark,
          }"
          @click.prevent="
            activeSection = 'home';
            $scrollTo('#home', 500);
          "
          >Home</a
        >
        <a
          :class="{
            ' px-4 p-2 rounded-full bg-slate-700 transition-all duration-300':
              activeSection === 'about' && isdark,
            ' px-4 p-2 rounded-full bg-gray-200 transition-all duration-300':
              activeSection === 'about' && !isdark,
            'px-4 py-2 cursor-pointer  transition-all':
              activeSection !== 'about',
            'text-black ': !isdark,
            'text-white hover:text-gray-100': isdark,
          }"
          @click.prevent="
            activeSection = 'about';
            $scrollTo('#about', 500);
          "
        >
          About
        </a>
        <a
          :class="{
            ' px-4 p-2 rounded-full bg-slate-700 transition-all duration-300':
              activeSection === 'projects' && isdark,
            ' px-4 p-2 rounded-full bg-gray-200 transition-all duration-300':
              activeSection === 'projects' && !isdark,
            'px-4 py-2 cursor-pointer  transition-all':
              activeSection !== 'projects',
            'text-black ': !isdark,
            'text-white hover:text-gray-100': isdark,
          }"
          @click.prevent="
            activeSection = 'projects';
            $scrollTo('#projects', 500);
          "
        >
          Projects
        </a>
        <a
          :class="{
            ' px-4 p-2 rounded-full bg-slate-700 transition-all duration-300':
              activeSection === 'experience' && isdark,
            ' px-4 p-2 rounded-full bg-gray-200 transition-all duration-300':
              activeSection === 'experience' && !isdark,
            'px-4 py-2 cursor-pointer  transition-all':
              activeSection !== 'experience',
            'text-black ': !isdark,
            'text-white hover:text-gray-100': isdark,
          }"
          @click.prevent="
            activeSection = 'experience';
            $scrollTo('#experience', 500);
          "
        >
          Experience
        </a>
        <a
          :class="{
            ' px-4 p-2 rounded-full bg-slate-700 transition-all duration-300':
              activeSection === 'contact' && isdark,
            ' px-4 p-2 rounded-full bg-gray-200 transition-all duration-300':
              activeSection === 'contact' && !isdark,
            'px-4 py-2 cursor-pointer  transition-all':
              activeSection !== 'contact',
            'text-black ': !isdark,
            'text-white hover:text-gray-100': isdark,
          }"
          @click.prevent="
            activeSection = 'contact';
            $scrollTo('#contact', 500);
          "
        >
          Contact
        </a>
      </div>
    </div>

    <div
      id="home"
      class="w-full px-4 justify-center lg:w-3/4 flex flex-col gap-4 items-center m-auto mb-4 pt-32 scroll-mt-36"
      :class="{ 'text-white': isdark, 'text-black': !isdark }"
    >
      <p class="text-3xl font-bold">
        Software Developer | Full-Stack Web Developer
      </p>
      <p
        class="lg:w-3/5 text-center"
        :class="{ 'text-gray-300': isdark, 'text-black': !isdark }"
      >
        Hello! I'm Kidus, a passionate Full-Stack Web Developer skilled in
        crafting seamless digital experiences. I specialize in modern frameworks
        and technologies like React, Vue.js, Node.js, and Go, bringing
        innovative ideas to life with clean, efficient code.
      </p>
      <div
        class="lg:w-3/4 flex lg:flex-row flex-col items-center gap-4 lg:gap-16 justify-center"
      >
        <button
          class="cursor-pointer font-semibold px-4 py-1 rounded-full text-lg flex gap-2 items-center"
          :class="{
            'outline-double text-white  hover:outline-dashed': isdark,
            'bg-slate-800 hover:bg-slate-900 text-white hover:text-white':
              !isdark,
          }"
        >
          Get in touch
          <Icon icon="material-symbols:arrow-right" width="28" height="28" />
        </button>
        <a
          class="cursor-pointer font-semibold px-4 py-1 rounded-full text-lg flex gap-2 items-center"
          :class="{
            'bg-slate-800 text-white hover:bg-slate-900': isdark,
            'outline-double text-black hover:outline-dashed  hover:text-slate-900':
              !isdark,
          }"
          href="/data/CV.pdf"
          download="CV.pdf"
        >
          Download CV
          <Icon icon="material-symbols:download" width="24" height="24" />
        </a>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="https://www.linkedin.com/in/kidus-birhane-670343241/"
            target="_blank"
            class="cursor-pointer rounded-full p-2"
            :class="{
              'bg-slate-700 hover:bg-slate-800': isdark,
              'bg-gray-200 hover:bg-gray-300': !isdark,
            }"
          >
            <Icon icon="et:linkedin" width="32" height="32" />
          </NuxtLink>
          <NuxtLink
            to="https://github.com/kid3234"
            target="_blank"
            class="cursor-pointer rounded-full p-2"
            :class="{
              'bg-slate-700 hover:bg-slate-800': isdark,
              'bg-gray-200 hover:bg-gray-300': !isdark,
            }"
          >
            <Icon icon="bytesize:github" width="30" height="30" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="relative mx-auto w-full mb-8">
      <div
        class="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 h-20 transition-colors duration-300"
        :class="{ 'bg-gray-700': isdark, 'bg-gray-400': !isdark }"
      ></div>

      <div
        class="absolute left-1/2 transform -translate-x-1/2 transition-transform duration-500"
        :class="{
          'bg-gray-900 border-gray-700': isdark,
          'bg-white border-gray-400': !isdark,
          'rotate-180': !isScrollingDown,
          'rotate-0  top-16': isScrollingDown,
        }"
      >
        <Icon
          icon="teenyicons:down-outline"
          width="24"
          height="26"
          :style="{ color: isdark ? '#374151' : '#000' }"
        />
      </div>
    </div>
    <div
      id="about"
      class="px-4 lg:w-3/4 flex flex-col gap-4 items-center m-auto mb-2 pt-32 scroll-mt-36"
      :class="{ 'text-white': isdark, 'text-black': !isdark }"
    >
      <P class="text-3xl font-bold">About me</P>
      <p class="lg:w-3/5 text-center">
        Hello, I’m Kidus, a Full-Stack Web Developer with expertise in React,
        Vue.js, Node.js, and Go. I love creating practical and engaging web
        applications. I have a BSc in Computer Science from Addis Ababa
        University, which has equipped me with strong problem-solving and
        analytical skills that I apply to every project. I’m passionate about
        technology and constantly looking to learn and grow. Let’s connect and
        build something great together!
      </p>
      <div class="w-full flex flex-wrap justify-between items-center">
        <Icon icon="tabler:brand-javascript" width="40" height="40" />
        <Icon icon="fa6-brands:golang" width="40" height="40" />
        <Icon icon="lineicons:typescript" width="40" height="40" />
        <Icon icon="carbon:logo-react" width="40" height="40" />
        <Icon icon="la:node" width="40" height="40" />
        <Icon icon="carbon:logo-vue" width="40" height="40" />
        <Icon icon="devicon-plain:postgresql-wordmark" width="40" height="40" />
        <Icon icon="devicon-plain:mongodb-wordmark" width="40" height="40" />
      </div>
    </div>
    <div class="relative mx-auto w-full mb-8">
      <div
        class="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 h-20 transition-colors duration-300"
        :class="{ 'bg-gray-700': isdark, 'bg-gray-400': !isdark }"
      ></div>

      <div
        class="absolute left-1/2 transform -translate-x-1/2 transition-transform duration-500"
        :class="{
          'bg-gray-900 border-gray-700': isdark,
          'bg-white border-gray-400': !isdark,
          'rotate-180': !isScrollingDown,
          'rotate-0  top-16': isScrollingDown,
        }"
      >
        <Icon
          icon="teenyicons:down-outline"
          width="24"
          height="26"
          :style="{ color: isdark ? '#374151' : '#000' }"
        />
      </div>
    </div>

    <!-- Projects -->

    <div
      id="projects"
      class="px-4 lg:w-3/4 flex flex-col gap-4 items-center justify-center text-white m-auto pt-32 scroll-mt-36 mb-4"
    >
      <p
        class="text-3xl font-bold"
        :class="{ 'text-white': isdark, 'text-gray-800': !isdark }"
      >
        My Projects
      </p>

      <div class="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-20">
        <div
          class="w-3/4 lg:w-full m-auto flex flex-col gap-2 rounded-lg shadow text-black"
          :class="{ 'bg-slate-700': isdark, 'bg-gray-100': !isdark }"
          v-for="project in projects"
          :key="project.name"
        >
          <img :src="project.image" alt="project image" class="rounded-t-lg" />
          <div class="p-2 flex flex-wrap items-center gap-2">
            <div v-for="lan in project.languages" :key="lan">
              <p
                class="px-4 py-2 rounded-full"
                :class="{
                  'bg-slate-600 text-white': isdark,
                  'bg-gray-200 text-black': !isdark,
                }"
              >
                {{ lan }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4 px-4 py-2">
            <NuxtLink :to="project.git" target="_blank" class="cursor-pointer">
              <Icon
                icon="bytesize:github"
                width="24"
                height="24"
                :class="{ 'text-white': isdark }"
              />
            </NuxtLink>
            <NuxtLink
              :to="project.vercel"
              target="_blank"
              class="cursor-pointer"
            >
              <Icon
                icon="akar-icons:link-out"
                width="24"
                height="24"
                :class="{ 'text-white': isdark }"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="relative mx-auto w-full mb-8">
      <div
        class="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 h-20 transition-colors duration-300"
        :class="{ 'bg-gray-700': isdark, 'bg-gray-400': !isdark }"
      ></div>

      <div
        class="absolute left-1/2 transform -translate-x-1/2 transition-transform duration-500"
        :class="{
          'bg-gray-900 border-gray-700': isdark,
          'bg-white border-gray-400': !isdark,
          'rotate-180': !isScrollingDown,
          'rotate-0  top-16': isScrollingDown,
        }"
      >
        <Icon
          icon="teenyicons:down-outline"
          width="24"
          height="26"
          :style="{ color: isdark ? '#374151' : '#000' }"
        />
      </div>
    </div>
    <!--experience  -->
    <div
      id="experience"
      class="px-4 lg:w-3/4 flex flex-col gap-4 items-center text-white m-auto pt-32 scroll-mt-36 mb-4"
    >
      <p
        class="text-3xl font-bold"
        :class="{ 'text-white': isdark, 'text-gray-800': !isdark }"
      >
        My Experience
      </p>

      <div class="relative flex flex-col">
        <div
          class="absolute left-5 top-0 w-1 h-full"
          :class="{ 'bg-gray-700': isdark, 'bg-gray-400': !isdark }"
        ></div>

        <div class="relative flex items-start mb-10">
          <div
            class="ml-14 rounded-lg p-6 shadow-md"
            :class="{
              'bg-gray-800 text-gray-200': isdark,
              'bg-gray-100 text-gray-800': !isdark,
            }"
          >
            <h3 class="text-lg font-semibold">
              Software Developer | SantimPy Financial Solution
            </h3>
            <span class="block text-sm text-gray-400">Jun 2023 - Present</span>
            <p class="mt-2 text-sm">
              I have more than one year of experience as a software developer at
              SantimPay, including my internship period.
            </p>
          </div>

          <div
            class="absolute -left-0 w-10 h-10 p-1 flex items-center justify-center rounded-full border-4"
            :class="{
              'bg-gray-900 border-gray-700': isdark,
              'bg-white border-gray-400': !isdark,
            }"
          >
            <img
              v-if="isdark"
              class="w-10"
              src="/image/sp white@4x-8.png"
              alt="santim logo"
            />
            <img
              v-if="!isdark"
              class="w-10"
              src="/image/splogonew.png"
              alt="santim logo"
            />
          </div>
        </div>

        <div class="relative flex items-start mb-10">
          <div
            class="absolute -left-0 w-10 h-10 flex items-center justify-center rounded-full border-4"
            :class="{
              'bg-gray-900 border-gray-700': isdark,
              'bg-white border-gray-400': !isdark,
            }"
          >
            <svg
              :class="{ 'text-gray-400': isdark, 'text-gray-400': !isdark }"
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2C8.1 2 5 5.1 5 9c0 4.5 7 13 7 13s7-8.5 7-13c0-3.9-3.1-7-7-7zm0 10.2c-1.8 0-3.2-1.5-3.2-3.2s1.5-3.2 3.2-3.2 3.2 1.5 3.2 3.2-1.5 3.2-3.2 3.2z"
              />
            </svg>
          </div>

          <div
            class="ml-14 rounded-lg p-6 shadow-md"
            :class="{
              'bg-gray-800 text-gray-200': isdark,
              'bg-gray-100 text-gray-800': !isdark,
            }"
          >
            <h3 class="text-lg font-semibold">Freelancing</h3>
            <span class="block text-sm text-gray-400"
              >Remote | 2024 - Present</span
            >
            <p class="mt-2 text-sm">
              Worked as a remote freelancer on Upwork and Freelancer.com,
              specializing in API integration and frontend development using
              React, Vue, Nuxt, and Next.js to deliver dynamic and user-friendly
              web applications.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="relative mx-auto w-full mb-8">
      <div
        class="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 h-20 transition-colors duration-300"
        :class="{ 'bg-gray-700': isdark, 'bg-gray-400': !isdark }"
      ></div>

      <div
        class="absolute left-1/2 transform -translate-x-1/2 transition-transform duration-500"
        :class="{
          'bg-gray-900 border-gray-700': isdark,
          'bg-white border-gray-400': !isdark,
          'rotate-180': !isScrollingDown,
          'rotate-0  top-16': isScrollingDown,
        }"
      >
        <Icon
          icon="teenyicons:down-outline"
          width="24"
          height="26"
          :style="{ color: isdark ? '#374151' : '#000' }"
        />
      </div>
    </div>

    <!-- get in touch -->
    <div
      id="contact"
      class="px-4 lg:w-3/4 flex flex-col gap-4 items-center m-auto mt-28"
      :class="{ 'text-white': isdark, 'text-gray-800': !isdark }"
    >
      <p
        class="text-3xl font-bold"
        :class="{ 'text-white': isdark, 'text-gray-800': !isdark }"
      >
        Get In Touch
      </p>
      <div class="w-full lg:w-3/4">
        <form @submit="sendEmail" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="email">Your email</label>
            <input
              v-model="email"
              type="email"
              name="user_email"
              required
              class="p-2 rounded-lg w-full"
              :class="{ 'bg-slate-600': isdark, 'bg-slate-200': !isdark }"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="message">Your message</label>
            <textarea
              v-model="message"
              id="message"
              name="message"
              required
              class="w-full h-40 rounded-lg p-4"
              :class="{ 'bg-slate-600': isdark, 'bg-slate-200': !isdark }"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-36 px-2 py-2 rounded-lg self-end font-semibold"
            :class="{
              'bg-white text-black': isdark,
              'outline-double text-gray-800': !isdark,
            }"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
