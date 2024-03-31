from enum import Enum

from pydantic import BaseModel

class Attraction(BaseModel):
    name: str
    
class Attractions(Enum):
    HEARST_CASTLE = "Hearst Castle"
    SIKH_GURDWARA_SAN_JOSE = "Sikh Gurdwara San Jose"
    STATUE_OF_TRAN_QUOC_TUAN = "Statue of Trần Quốc Tuấn"
    THE_TECH_INTERACTIVE = "The Tech Interactive"
    WINCHESTER_MYSTERY_HOUSE = "Winchester Mystery House"
    BURRELL_SCHOOL_VINEYARD_AND_WINERY = "Burrell School Vineyard and Winery"
    LAKE_CUNNINGHAM_SKATE_PARK = "Lake Cunningham Skate Park"
    SAN_JOSE_MUSEUM_OF_QUILTS_AND_TEXTILES = "San Jose Museum of Quilts & Textiles"
    ROSICRUCIAN_EGYPTIAN_MUSEUM = "Rosicrucian Egyptian Museum"
    JAPANESE_AMERICAN_MUSEUM_OF_SAN_JOSE = "Japanese American Museum of San Jose"
    SAN_PEDRO_SQUARE_MARKET_BAR = "San Pedro Square Market Bar"
    JAPANESE_FRIENDSHIP_GARDEN = "Japanese Friendship Garden"
    VIET_MUSEUM = "Viet Museum"
    MEXICAN_HERITAGE_PLAZA = "Mexican Heritage Plaza"
    CATHEDRAL_BASILICA_OF_ST_JOSEPH = "Cathedral Basilica of St. Joseph"
    THE_ALAMEDA_ARTWORKS = "The Alameda Artworks"
    PERALTA_ADOBE_AND_FALLON_HOUSE = "Peralta Adobe and Fallon House"
    LICK_OBSERVATORY = "Lick Observatory"
    NASA_AMES_RESEARCH_CENTER = "NASA Ames Research Center"
    HAKONE_GARDENS = "Hakone Gardens"
    COMPUTER_HISTORY_MUSEUM = "Computer History Museum"
    OLYMPIC_BLACK_POWER_STATUE = "Olympic Black Power Statue"
