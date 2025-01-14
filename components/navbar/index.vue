<template>
  <div class="w-full flex py-8">
    <div
      class="w-fit bg-slate-800 rounded-full m-auto flex justify-center gap-10 items-center"
    >
      <a
        :class="activeSection === 'home' ? 'bg-slate-700' : 'bg-slate-800 px-4 p-2 rounded-full text-gray-400 hover:text-gray-100 cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700'"
        @click.prevent="$scrollTo('#section1', 500)"
       
        >Home</a
      >
      <a
        class="bg-slate-800 px-4 p-2 rounded-full text-gray-400 hover:text-gray-100 cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700"
      >
        About
      </a>
      <a
        class="bg-slate-800 px-4 p-2 rounded-full text-gray-400 hover:text-gray-100 cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700"
      >
        Projects
      </a>
      <a
        class="bg-slate-800 px-4 p-2 rounded-full text-gray-400 hover:text-gray-100 cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700"
      >
        Experience
      </a>
      <a
        class="bg-slate-800 px-4 p-2 rounded-full text-gray-400 hover:text-gray-100 cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700"
      >
        Contact
      </a>
    </div>
  </div>
</template>

<script setup>

const activeSection = ref('');

onMounted(() => {
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
});
</script>

<style lang="scss" scoped></style>
