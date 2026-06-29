import {
    CreditCard,
    CheckCircle2,
    Shield,
    AlertTriangle,
    TrendingUp,
    Flame,
    Settings,
    Users,
    UserCheck,
    UserX
} from "lucide-react";

const icons = {
    Users: Users,
    Transactions: CreditCard,
    Approved: CheckCircle2,
    Blocked: Shield,
    Flagged: AlertTriangle,
    "Fraud Events": AlertTriangle,
    "High Risk": Flame,
    "Fraud Rate": TrendingUp,
    "Total Users": Users,
    Active: UserCheck,
    Disabled: UserX,
    "Active Rules": Settings
};

function StatsCard({ title, value }) {

    const Icon = icons[title] || CreditCard;

    return (
        <div className="ui-card ui-stat-card card-pop hover-lift">
          
            <div className="ui-stat-top">

                <span className="ui-stat-icon">
                    <Icon size={22} />
                </span>

                <span className="ui-stat-title">
                    {title}
                </span>

            </div>

            <h2 className="ui-stat-value">
                {value}
            </h2>

        </div>
    );
}

export default StatsCard;