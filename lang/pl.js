LANG.absorbLang({
    "meta.language.name": "Polish",
    "meta.language.name.native": "Polish",
    "meta.language.code": "pl-*",

    // UI
    "caffeinated.internal.widgets": "Widgets",
    "caffeinated.internal.followers_count_text": (count) => `${count} ${(count == 1 ? "Obserwujący" : "Obserwujących")}`,
    "caffeinated.internal.subscribers_count_text": (count) => `${count} ${(count == 1 ? "Subskrybent" : "Subskrybentów")}`,

    // Generic
    "generic.enabled": "Włączone",
    "generic.font": "Czcionka",
    "generic.font.size": "Rozmair Czcionki (px)",
    "generic.text.color": "Kolor Tekstu",
    "generic.background.color": "Kolor Tła",
    "generic.volume": "Głośność",
    //"generic.alert.audio": "Alert Audio",
    //"generic.alert.image": "Alert Image",
    "generic.audio.file": "Dźwięk",
    "generic.image.file": "Zdjęcie",
    "generic.currency": "Waluta",
    "generic.enable_audio": "Włącz Niestandardowe Dzwięki",
    //"generic.use_custom_image": "Use Custom Image",
    "generic.height": "Wysokość (px)",
    "generic.height": "Szerokość (px)",

    // Video Share
    //"caffeinated.videoshare.title": "Video Share",
    //"caffeinated.videoshare.donations_only": "Donations Only",
    //"caffeinated.videoshare.skip": "Skip",
    //"caffeinated.videoshare.pause": "Play/Pause",
    //"caffeinated.videoshare.player_only": "Player Only (No frame)",

    // Raid
    //"caffeinated.raid_alert.title": "Raid Alert",
    "caffeinated.raid_alert.format.now_raiding": (raider, viewers) => `${raider} właśnie cie zrajdował z ${viewers} ${(viewers == 1) ? "widzem" : "widzami"}`,

    // Subscription Goal
    "caffeinated.subscription_goal.title": "Cel Subskrypcji",

    // Subscription
    //"caffeinated.subscription_alert.title": "Subscription Alert",
    //"caffeinated.subscription_alert.format.sub": (name, months) => `${name} just subscribed for ${months} ${(months == 1) ? "month" : "months"}`,
    //"caffeinated.subscription_alert.format.resub": (name, months) => `${name} just resubscribed for ${months} ${(months == 1) ? "month" : "months"}`,
    //"caffeinated.subscription_alert.format.subgift": (name, giftee, months) => `${name} just gifted ${giftee} a ${months} month subscription`,
    //"caffeinated.subscription_alert.format.resubgift": (name, giftee, months) => `${name} just gifted ${giftee} a ${months} month resubscription`,
    //"caffeinated.subscription_alert.format.anonsubgift": (giftee, months) => `Anonymous just gifted ${giftee} a ${months} month subscription`,
    //"caffeinated.subscription_alert.format.anonresubgift": (giftee, months) => `Anonymous just gifted ${giftee} a ${months} month resubscription`,

    // Credits
    "caffeinated.credits.title": "Credits",

    // Settings
    "caffeinated.settings.title": "Ustawienia",
    "caffeinated.settings.signout": "Wyloguj",
    "caffeinated.settings.language": "Język",
    "caffeinated.settings.view_changelog": "Pokaż Dziennik Zmian",
    "caffeinated.settings.chatbot_login": "Połącz ChatBot'a z Kontem",
    "caffeinated.settings.chatbot_logout": "Rozłącz ChatBot'a od Konta",
    "caffeinated.settings.enable_discord_integration": "Włączono Integracje z Discord'em",

    // Stream Uptime
    "caffeinated.uptime.title": "Czas Streama",

    // Support Us
    "caffeinated.supporters.title": "Wesprzyj Nas",

    // Chat Display
    "caffeinated.chatdisplay.title": "Chat",
    "caffeinated.chatdisplay.join_text": (name) => `${name} dołaczył`,
    "caffeinated.chatdisplay.leave_text": (name) => `${name} wyszedł`,
    "caffeinated.chatdisplay.follow_text": (name) => `${name} zaobserwował`,
    //"caffeinated.chatdisplay.reward_text": (name, title, image) => `${name} just redeemed ${image}${title}`,
    "caffeinated.chatdisplay.show_viewers": "Pokaz Widzów",
    "caffeinated.chatdisplay.copy_chat_dock_link": "Skopiuj URL OBS DOCK",
    //"caffeinated.chatdisplay.copy_viewers_dock_link": "Copy Viewers List OBS Dock Link",

    // Chat
    "caffeinated.chat.title": "Czat",
    "caffeinated.chat.show_donations": "Pokaż dotacje",
    "caffeinated.chat.chat_direction": "Kierunek",
    "caffeinated.chat.chat_animation": "Animacja",
    "caffeinated.chat.text_align": "Kierunek Tekstu",

    // Donation Goal
    "caffeinated.donation_goal.title": "Cel Dotacji",
    "caffeinated.donation_goal.current_amount": "Ilość",

    // Follower Goal
    "caffeinated.follower_goal.title": "Cel Obserwacji",

    // Generic Goal
    "caffeinated.generic_goal.name": "Tytuł",
    //"caffeinated.generic_goal.goal_amount": "Target Amount",
    "caffeinated.generic_goal.text_color": "Kolor Tytułu",
    //"caffeinated.generic_goal.bar_color": "Progress Bar Color",

    // Donation Alert
    //"caffeinated.donation_alert.title": "Donation Alert",
    //"caffeinated.donation_alert.text_to_speech_voice": "TTS Voice",

    // Follower Alert
    //"caffeinated.follower_alert.title": "Follower Alert",
    "caffeinated.follower_alert.format.followed": (user) => `${user} zaobserwował`,

    // Spotify
    //"spotify.integration.title": "Spotify",
    "spotify.integration.login": "Zaloguj przez Spotify",
    "spotify.integration.logging_in": "Logowanie",
    "spotify.integration.logged_in_as": (name) => `Zalogowano jako ${name} (Kliknij aby wylogować)`,
    //"spotify.integration.announce": "Announce Song",
    //"spotify.integration.enable_song_command": "Enable Song Command",
    //"spotify.integration.background_style": "Background Style",
    //"spotify.integration.image_style": "Image Style",
    "spotify.integration.now_playing_announcment": (title, artist) => `Aktualnie gra: ${title} - ${artist}`,

    // View Counter
    "caffeinated.view_counter.title": "Pokaż Licznik",

    // Recent Follow
    "caffeinated.recent_follow.title": "Ostatni Obserwujący",

    // Donation Ticker
    //"caffeinated.donation_ticker.title": "Donation Ticker",

    // Top Donation
    "caffeinated.top_donation.title": "Top Dotacje",

    // Recent Donation
    "caffeinated.recent_donation.title": "Ostatnia Dotacja",

    // Recent Subscription
    "caffeinated.recent_subscription.title": "Ostatni Subskrybent",

    // Follow Counter
    "caffeinated.follow_counter.title": "Licznik Obserwacji",

    // Subscriber Counter
    "caffeinated.subscriber_counter.title": "Licznik Subskrypcji",

    // Chat Bot
    "caffeinated.chatbot.title": "Chat Bot",
    "caffeinated.chatbot.commands": "Komendy",
    //"caffeinated.chatbot.follow_callout": "Follow Callout (Leave blank to disable)",
    //"caffeinated.chatbot.donation_callout": "Donation Callout (Leave blank to disable)",
    //"caffeinated.chatbot.welcome_callout": "Welcome Callout (Leave blank to disable)",
    //"caffeinated.chatbot.default_reply": "Casterlabs is a free stream widget service!",
	"caffeinated.chatbot.command_type": "Typ Komendy",
    //"caffeinated.chatbot.trigger": "Trigger",
    "caffeinated.chatbot.reply": "Odpowiedź",
    //"caffeinated.chatbot.uptime_command.enable": "Enable Uptime Command",
    "caffeinated.chatbot.uptime_command.format": (time) => `Stream trwa: ${time}`,
    //"caffeinated.chatbot.uptime_command.not_live": "We're off the air",

    // Caffeine Integration
    //"caffeine.integration.title": "Caffeine",
    "caffeine.integration.new_thumbnail": "Nowa Miniaturka",
    //"caffeine.integration.rating_selector": "Content Rating",
    "caffeine.integration.title_selector": "Tytuł",
    "caffeine.integration.game_selector": "Wybrana Gra",
    "caffeine.integration.update": "Aktualizacja",

    // Casterlabs Companion
    //"caffeinated.companion.title": "Casterlabs Companion",
    "caffeinated.companion.copy": "Skopiuj Link",
    "caffeinated.companion.reset": "Zresetuj Link"

}, "pl-*");
