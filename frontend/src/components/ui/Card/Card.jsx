function Card({
    title,
    subtitle,
    actions,
    children,
    className = ""
}) {
    return (
        <div className={`ui-card ${className}`}>

            {(title || subtitle || actions) && (
                <div className="ui-card-header">

                    <div>

                        {title && (
                            <h3 className="ui-card-title">
                                {title}
                            </h3>
                        )}

                        {subtitle && (
                            <p className="ui-card-subtitle">
                                {subtitle}
                            </p>
                        )}

                    </div>

                    {actions && (
                        <div className="ui-card-actions">
                            {actions}
                        </div>
                    )}

                </div>
            )}

            <div className="ui-card-body">
                {children}
            </div>

        </div>
    );
}

export default Card;