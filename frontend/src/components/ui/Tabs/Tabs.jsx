import "./Tabs.css";

function Tabs({

    tabs,
    activeTab,
    onChange

}) {

    return (

        <div className="ui-tabs">

            {tabs.map(tab => (

                <button

                    key={tab.value}

                    className={`ui-tab ${
                        activeTab === tab.value
                            ? "ui-tab-active"
                            : ""
                    }`}

                    onClick={() => onChange(tab.value)}

                >

                    {tab.label}

                </button>

            ))}

        </div>

    );

}

export default Tabs;