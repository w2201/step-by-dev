# 📊 StepByDev — Diagramme ER
```erDiagram
    USER {
        int id PK
        string nom
        string prenom
        string email
        string password_hash
        string role
        date date_inscription
        string niveau_initial
    }

    PARCOURS {
        int id PK
        string titre
        string description
        int duree_semaines
        string stack_cible
    }

    MODULE {
        int id PK
        int parcours_id FK
        string titre
        int ordre
        string type
    }

    LECON {
        int id PK
        int module_id FK
        string titre
        text contenu
        string type_media
        int ordre
    }

    PROGRESSION {
        int id PK
        int user_id FK
        int lecon_id FK
        boolean completee
        date date_completion
        int score
    }

    PROJET_FIL_ROUGE {
        int id PK
        int user_id FK
        string titre
        string repo_git
        string statut
        date date_creation
    }

    LIVRABLE {
        int id PK
        int projet_id FK
        string type
        string url
        date date_soumission
        string feedback
    }

    FORMATEUR {
        int id PK
        int user_id FK
        string specialite
        string bio
    }

    SESSION_LIVE {
        int id PK
        int formateur_id FK
        int module_id FK
        datetime date_heure
        string lien_visio
        int duree_minutes
    }

    BADGE {
        int id PK
        string nom
        string description
        string icone
        string condition_obtention
    }

    USER_BADGE {
        int user_id FK
        int badge_id FK
        date date_obtention
    }

    USER ||--o{ PROGRESSION : "suit"
    USER ||--o{ PROJET_FIL_ROUGE : "possède"
    USER ||--o{ USER_BADGE : "décroche"
    FORMATEUR ||--o{ SESSION_LIVE : "anime"
    PARCOURS ||--o{ MODULE : "contient"
    MODULE ||--o{ LECON : "décompose"
    MODULE ||--o{ SESSION_LIVE : "accompagne"
    LECON ||--o{ PROGRESSION : "trackée par"
    PROJET_FIL_ROUGE ||--o{ LIVRABLE : "génère"
    BADGE ||--o{ USER_BADGE : "attribué via"
```
