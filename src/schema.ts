
export interface DesignRequirements {
    name:              string;
    subscriptionLevel: string;
    locations:         Location[];
}

export interface Location {
    locationName:    string;
    streetAddress:   string;
    addressLocality: string;
    addressRegion:   string;
    postalCode:      string;
    beacons:         Beacon[];
    floors:          Floor[];
}

export interface Beacon {
    beaconType: string;
    quantity:   number;
}

export interface Floor {
    floorName:         string;
    dimension_x:       number;
    dimension_y:       number;
    dimension_units:   string;
    open_floorplan:    boolean;
    floorplan_img_url: string;
}

export interface DesignCart {
    message: Message;
}

export interface Message {
    products: Product[];
}

export interface Product {
    product:     string;
    description: string;
    pricing:     Pricing;
    quantity:    number;
}

export interface Pricing {
    amount:         number;
    amount_decimal: string;
    billing_scheme: string;
    currency:       string;
    interval:       string;
    interval_count: number;
}
