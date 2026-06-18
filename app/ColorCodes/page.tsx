export default function ColorCodes() {
    return (
        <div className="flex flex-col">
            <h1>Primary Colors</h1>
            <div className="flex">
                <div className="flex items-center justify-center w-50 h-50 bg-[#2563EB]">
                    Primary Blue
                </div>
                <div className="flex items-center justify-center w-50 h-50 bg-[#1D4ED8]">
                    Dark Blue
                </div>
                <div className="flex items-center justify-center w-50 h-50 bg-[#3B82F6]">
                    Hover Blue
                </div>
                <div className="flex items-center justify-center w-50 h-50 bg-[#DBEAFE]">
                    Light Blue
                </div>
            </div>

            <h1>Sidebar Colors</h1>
            <div className="flex">
                <div className="flex items-center justify-center w-50 h-50 bg-[#021B3A]">
                    Sidebar Background
                </div>
                <div className="flex items-center justify-center w-50 h-50 bg-[#0A2348]">
                    Sidebar Secondary
                </div>
                <div className="flex items-center justify-center w-50 h-50 bg-[#2563EB]">
                    Active Menu Item
                </div>
                <div className="flex items-center justify-center w-50 h-50 bg-[#12305D]">
                    Sidebar Border
                </div>
                <div className="flex items-center justify-center w-50 h-50 bg-[#FFFFFF]">
                    Sidebar Text
                </div>
                <div className="flex items-center justify-center w-50 h-50 bg-[#94A3B8]">
                    Sidebar Muted Text
                </div>
            </div>
        </div>
    );
}
