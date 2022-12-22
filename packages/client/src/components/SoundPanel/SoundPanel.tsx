import { Switch } from "antd";
import "./SoundPanel.scss";
import SoundOnIcon from "../customIcons/SoundOnIcon";
import SoundOffIcon from "../customIcons/SoundOffIcon";
import { SwitchChangeEventHandler } from "antd/lib/switch";

export type SoundPanelProps = {
    audioContext: AudioContext;
    gainNode?: GainNode;
};

export const SoundPanel = ({ audioContext }: SoundPanelProps) => {
    let isSoundEnabled = false;

    try {
        isSoundEnabled = JSON.parse(
            localStorage.getItem("soundIsEnabled") || ""
        );
    } catch (error) {
        isSoundEnabled = false;
    }

    const togglePlay: SwitchChangeEventHandler = (checked, e) => {
        e.stopPropagation();
        localStorage.setItem("soundIsEnabled", JSON.stringify(checked));

        (document.activeElement as HTMLInputElement).blur();

        if (audioContext.state === "suspended") {
            audioContext.resume();

            return;
        }

        if (audioContext.state === "running") {
            audioContext.suspend();
        }
    };

    return (
        <Switch
            className="sound-switch"
            checkedChildren={<SoundOnIcon style={{ color: "#fff" }} />}
            unCheckedChildren={<SoundOffIcon style={{ color: "#fff" }} />}
            onChange={togglePlay}
            defaultChecked={isSoundEnabled}
        />
    );
};
