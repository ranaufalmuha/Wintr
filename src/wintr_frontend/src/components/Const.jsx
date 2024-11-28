import { InstagramIcon, GithubIcon, LinkedinIcon, ThreadsIcon, XIcon, DiscordIcon, FacebookIcon, FacebookMessengerIcon, LineIcon, MediumIcon, PinterestIcon, QuoraIcon, RedditIcon, SnapchatIcon, SpotifyIcon, TelegramIcon, TiktokIcon, TwitchIcon, ViberIcon, VKIcon, WhatsappIcon, YoutubeIcon } from './icons/SocialMedia';

export const platforms = [
    "discord",
    "facebook",
    "facebook_messenger",
    "github",
    "instagram",
    "linkedin",
    "line",
    "medium",
    "pinterest",
    "quora",
    "reddit",
    "snapchat",
    "spotify",
    "telegram",
    "threads",
    "tiktok",
    "twitch",
    "viber",
    "vk",
    "whatsapp",
    "x",
    "youtube",
];

export const ConstIconData = (isSubscribe) => {
    const ICON_CLASS = `${isSubscribe ? "fill-accent" : ""} w-7 h-7 object-contain`;

    return {
        discord: <DiscordIcon className={ICON_CLASS} />,
        facebook: <FacebookIcon className={ICON_CLASS} />,
        facebook_messenger: <FacebookMessengerIcon className={ICON_CLASS} />,
        github: <GithubIcon className={ICON_CLASS} />,
        instagram: <InstagramIcon className={ICON_CLASS} />,
        linkedin: <LinkedinIcon className={ICON_CLASS} />,
        line: <LineIcon className={ICON_CLASS} />,
        medium: <MediumIcon className={ICON_CLASS} />,
        pinterest: <PinterestIcon className={ICON_CLASS} />,
        quora: <QuoraIcon className={ICON_CLASS} />,
        reddit: <RedditIcon className={ICON_CLASS} />,
        snapchat: <SnapchatIcon className={ICON_CLASS} />,
        spotify: <SpotifyIcon className={ICON_CLASS} />,
        telegram: <TelegramIcon className={ICON_CLASS} />,
        threads: <ThreadsIcon className={ICON_CLASS} />,
        tiktok: <TiktokIcon className={ICON_CLASS} />,
        twitch: <TwitchIcon className={ICON_CLASS} />,
        viber: <ViberIcon className={ICON_CLASS} />,
        vk: <VKIcon className={ICON_CLASS} />,
        whatsapp: <WhatsappIcon className={ICON_CLASS} />,
        x: <XIcon className={ICON_CLASS} />,
        youtube: <YoutubeIcon className={ICON_CLASS} />,
    };
};

// Anda bisa menambahkan konstanta lain di sini
export const lain2 = 'Contoh Konstanta Lain';