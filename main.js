/* ============================================================
   夜色弦音 · 小提琴社  交互脚本
   功能：背景音乐播放、平滑锚点滚动、滚动动效、
         表单校验与反馈、浮动返回顶部
   ============================================================ */
(function () {
    'use strict';

    /* ---------------- 1. 背景音乐 ---------------- */
    var bgm = document.getElementById('bgm');
    var musicBtn = document.getElementById('musicBtn');
    var audioReady = !!bgm;

    if (musicBtn && bgm) {
        bgm.volume = 0.55;

        var setPlaying = function (playing) {
            musicBtn.classList.toggle('playing', playing);
            musicBtn.setAttribute('aria-label', playing ? '暂停背景音乐' : '播放背景音乐');
            musicBtn.title = playing ? '点击暂停《夜色弦音》' : '点击播放《夜色弦音》';
        };

        musicBtn.addEventListener('click', function () {
            if (bgm.paused) {
                var p = bgm.play();
                if (p && p.catch) {
                    p.then(function () {
                        setPlaying(true);
                    }).catch(function () {
                        alert('浏览器阻止了自动播放，请再次点击按钮，或检查音频文件是否存在。');
                        setPlaying(false);
                    });
                } else {
                    setPlaying(true);
                }
            } else {
                bgm.pause();
                setPlaying(false);
            }
        });

        bgm.addEventListener('ended', function () { setPlaying(false); });
        bgm.addEventListener('pause', function () { setPlaying(false); });
        bgm.addEventListener('play', function () { setPlaying(true); });
    }

    /* ---------------- 2. 锚点平滑滚动（补偿吸顶导航高度） ---------------- */
    var header = document.querySelector('.site-header');

    function scrollToTarget(target) {
        var offset = header ? header.offsetHeight + 6 : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href || href === '#') { return; }
        link.addEventListener('click', function (e) {
            var target = document.querySelector(href);
            if (!target) { return; }
            e.preventDefault();
            scrollToTarget(target);
            history.replaceState(null, '', href);
        });
    });

    /* ---------------- 3. 滚动入场动画 ---------------- */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------------- 4. 浮动返回顶部 ---------------- */
    var floatTop = document.getElementById('floatTop');
    if (floatTop) {
        var onScroll = function () {
            if (window.pageYOffset > 600) {
                floatTop.classList.add('show');
            } else {
                floatTop.classList.remove('show');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        floatTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------------- 5. 报名表校验 ---------------- */
    var form = document.getElementById('enrollForm');
    var msg = document.getElementById('formMsg');

    function showMsg(text, isError) {
        if (!msg) { return; }
        msg.textContent = text;
        msg.classList.toggle('error', !!isError);
        msg.classList.add('show');
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function onlyDigits(v) { return /^\d+$/.test(v); }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var nameInput = document.getElementById('name');
            var name = nameInput.value.trim();
            var y = form.birthY.value.trim();
            var m = form.birthM.value.trim();
            var d = form.birthD.value.trim();
            var phone = form.phone.value.trim();
            var email = form.email.value.trim();
            var grade = form.grade.value;
            var introEl = document.getElementById('selfIntro');
            var intro = introEl.value.trim();
            var interests = form.querySelectorAll('input[name="interest"]:checked');

            if (name.length < 2) {
                showMsg('请填写真实姓名（至少 2 个字）。', true);
                form.name.focus();
                return;
            }
            if (!onlyDigits(y) || y.length !== 4 || +y < 1950 || +y > 2020) {
                showMsg('出生年份请填写 4 位数字（1950—2020）。', true);
                form.birthY.focus();
                return;
            }
            if (!onlyDigits(m) || +m < 1 || +m > 12) {
                showMsg('出生月份请填写 1—12 的数字。', true);
                form.birthM.focus();
                return;
            }
            if (!onlyDigits(d) || +d < 1 || +d > 31) {
                showMsg('出生日期请填写 1—31 的数字。', true);
                form.birthD.focus();
                return;
            }
            if (!/^1[3-9]\d{9}$/.test(phone)) {
                showMsg('手机号格式不正确，请填写 11 位大陆手机号。', true);
                form.phone.focus();
                return;
            }
            if (!/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(email)) {
                showMsg('邮箱格式不正确，例如 name@qq.com。', true);
                form.email.focus();
                return;
            }
            if (!grade) {
                showMsg('请选择你的年级。', true);
                form.grade.focus();
                return;
            }
            if (interests.length === 0) {
                showMsg('请至少选择一个兴趣方向。', true);
                return;
            }
            if (intro.length < 10) {
                showMsg('自我介绍至少写 10 个字，让我们多了解你一点。', true);
                introEl.focus();
                return;
            }

            var picked = Array.prototype.map.call(interests, function (i) { return i.value; }).join('、');
            form.reset();
            showMsg('提交成功！' + name + '，你选择的兴趣方向是「' + picked +
                    '」，我们会在三个工作日内联系你。期待在周五晚上的排练室见到你。', false);
        });

        form.addEventListener('reset', function () {
            if (msg) { msg.classList.remove('show', 'error'); msg.textContent = ''; }
        });
    }

    /* ---------------- 6. 页脚年份 ---------------- */
    var yearEl = document.getElementById('year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
