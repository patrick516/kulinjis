"use client";

import React, { useState } from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

interface PersonCardProps {
  name: string;
  detail?: string;
  children?: React.ReactNode;
  accent?: string;
  border?: string;
}

interface RowProps {
  label: string;
  value: string;
}

const Section = ({ title, children }: SectionProps) => (
  <div style={{ marginBottom: "2rem" }}>
    <h2
      style={{
        fontSize: "1.25rem",
        fontWeight: 500,
        color: "#0F6E56",
        borderBottom: "1px solid #9FE1CB",
        paddingBottom: "0.4rem",
        marginBottom: "0.75rem",
      }}
    >
      {title}
    </h2>
    {children}
  </div>
);

const PersonCard = ({
  name,
  detail,
  children,
  accent = "#E1F5EE",
  border = "#5DCAA5",
}: PersonCardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: accent,
        border: `1px solid ${border}`,
        borderRadius: "10px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        cursor: children ? "pointer" : "default",
      }}
      onClick={() => children && setOpen(!open)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{ fontWeight: 500, color: "#085041", fontSize: "0.95rem" }}
        >
          {name}
        </span>
        {detail && (
          <span style={{ fontSize: "0.8rem", color: "#0F6E56" }}>{detail}</span>
        )}
        {children && (
          <span style={{ fontSize: "0.75rem", color: "#1D9E75" }}>
            {open ? "▲ hide" : "▼ show"}
          </span>
        )}
      </div>
      {open && (
        <div
          style={{
            marginTop: "0.6rem",
            borderTop: "1px solid #9FE1CB",
            paddingTop: "0.6rem",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const Row = ({ label, value }: RowProps) => (
  <p style={{ margin: "0.25rem 0", fontSize: "0.88rem", color: "#085041" }}>
    <span style={{ fontWeight: 500 }}>{label}: </span>
    <span style={{ color: "#04342C" }}>{value}</span>
  </p>
);

// Reusable nested sub-card (dashed border, cream bg)
const SubCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      background: "#fdfaf6",
      border: "1px dashed #9FE1CB",
      borderRadius: "8px",
      padding: "0.6rem 0.8rem",
      marginBottom: "0.5rem",
    }}
  >
    <p
      style={{
        fontWeight: 500,
        color: "#085041",
        fontSize: "0.88rem",
        marginBottom: "0.3rem",
      }}
    >
      {title}
    </p>
    {children}
  </div>
);

const Sub = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: "0.82rem", color: "#04342C", margin: "0.15rem 0" }}>
    {children}
  </p>
);

export default function ClanHistory() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fdfaf6",
        padding: "2.5rem 1.5rem",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 500,
              color: "#04342C",
              marginBottom: "0.3rem",
            }}
          >
            Tribe of <span style={{ color: "#1D9E75" }}>Kulinji</span>
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#0F6E56" }}>
            Genealogical record — origin, migration, and descendants
          </p>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "#5DCAA5",
              margin: "0.75rem auto 0",
            }}
          />
        </div>

        {/* ── Origin ─────────────────────────────────────────────────────── */}
        <Section title="Origin of the Tribe">
          <p style={{ fontSize: "0.93rem", color: "#04342C", lineHeight: 1.7 }}>
            The Kulinji tribe originated from <em>Mozambique</em>. Three Kulinji
            men migrated to Malawi and settled in <em>Chididi</em>.
          </p>
          <div
            style={{
              marginTop: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                background: "#E1F5EE",
                border: "1px solid #9FE1CB",
                borderRadius: "8px",
                padding: "0.6rem 1rem",
              }}
            >
              <span style={{ fontWeight: 500, color: "#085041" }}>
                February Kulinji
              </span>
              <span
                style={{
                  fontSize: "0.82rem",
                  color: "#0F6E56",
                  marginLeft: "0.75rem",
                }}
              >
                Hunter
              </span>
            </div>
            <div
              style={{
                background: "#E1F5EE",
                border: "1px solid #9FE1CB",
                borderRadius: "8px",
                padding: "0.6rem 1rem",
              }}
            >
              <span style={{ fontWeight: 500, color: "#085041" }}>
                Thomson Kulinji
              </span>
              <span
                style={{
                  fontSize: "0.82rem",
                  color: "#0F6E56",
                  marginLeft: "0.75rem",
                }}
              >
                Fisherman — moved Chididi → Chazuka (Green Ntafia) → Ngona
                village
              </span>
            </div>
            <div
              style={{
                background: "#F1EFE8",
                border: "1px solid #D3D1C7",
                borderRadius: "8px",
                padding: "0.6rem 1rem",
              }}
            >
              <span style={{ fontWeight: 500, color: "#444441" }}>
                Third brother
              </span>
              <span
                style={{
                  fontSize: "0.82rem",
                  color: "#5F5E5A",
                  marginLeft: "0.75rem",
                }}
              >
                Name not known
              </span>
            </div>
          </div>
        </Section>

        {/* ── February Kulinji ───────────────────────────────────────────── */}
        <Section title="February Kulinji — Children & Descendants">
          <p
            style={{
              fontSize: "0.85rem",
              color: "#0F6E56",
              marginBottom: "0.75rem",
            }}
          >
            Click a name to expand descendants.
          </p>

          <PersonCard name="Robert" detail="14 children — 13 died">
            <Row
              label="Surviving child"
              value="Micah (also known as Mrs Moyo)"
            />
          </PersonCard>

          <PersonCard name="Grace" detail="No details recorded" />

          <PersonCard name="Andra" detail="Sons recorded">
            <Row label="Sons" value="Noliah, Piyason, Chimwemwe" />
          </PersonCard>

          <PersonCard name="Elina" detail="No details recorded" />

          <PersonCard name="David" detail="8 children — most died">
            <Row label="Surviving children" value="Sonya, Joyce, Grace" />
          </PersonCard>

          <PersonCard name="Idess" detail="No details recorded" />
          <PersonCard name="Nokh" detail="No details recorded" />

          <PersonCard name="Moses" detail="Migrated">
            <Row label="Location" value="Moved and settled in Zimbabwe" />
          </PersonCard>
        </Section>

        {/* ── Thomson Kulinji ────────────────────────────────────────────── */}
        <Section title="Thomson Kulinji — Children & Descendants">
          <p
            style={{
              fontSize: "0.85rem",
              color: "#0F6E56",
              marginBottom: "0.75rem",
            }}
          >
            Thomson had six children: Mayilosi, Lice, Falesi, Offesi, Martha,
            Agness.
          </p>

          {/* Mayilosi */}
          <PersonCard name="Mayilosi" detail="Multiple wives">
            <p
              style={{
                fontSize: "0.85rem",
                color: "#085041",
                marginBottom: "0.5rem",
              }}
            >
              Children from first wife:{" "}
              <strong>Harry, Paul, Fostino, Doliya, Falumesi</strong>
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#085041",
                marginBottom: "0.5rem",
              }}
            >
              From second wife (Lucy / Mataka): see below. Another son,{" "}
              <em>Redison</em>, died young.
            </p>

            {/* Harry */}
            <SubCard title="Harry">
              <Sub>Wife 1 (Matalia): Chrisy, Stevelia, Falesi</Sub>
              <Sub>Wife 2: Agness</Sub>
              <Sub>Wife 3 (from Mulanje): Thomson</Sub>
              <Sub>Wife 4 (from Lilongwe): Ndiuzayani</Sub>
              <Sub>
                <em>Matalia married Chingaphonyg:</em> Esinala (died), Lenard,
                Charmaine (Alex), Robin, Fatima (died young), Edina (Police
                Super)
              </Sub>
            </SubCard>

            {/* Paul */}
            <SubCard title="Paul">
              <Sub>
                Wife 1 (Mary): Maguleti, Vayleti, Towera, Pilirani, Maloto,
                Ndaona, Jamikani, Lonjezo
              </Sub>
              <Sub>Wife 2 (Felister): Mabvuto, Regina, Innocent</Sub>
              <Sub>Wife 3 (name unknown): Stewart, Chrissy</Sub>
              <div
                style={{
                  marginTop: "0.4rem",
                  fontSize: "0.8rem",
                  color: "#0F6E56",
                }}
              >
                <p style={{ margin: "0.1rem 0" }}>Maguleti → James</p>
                <p style={{ margin: "0.1rem 0" }}>
                  Vayleti → Faith, Junior (Patrice)
                </p>
                <p style={{ margin: "0.1rem 0" }}>
                  Towera → Ongani, Diana, Kenneth
                </p>
                <p style={{ margin: "0.1rem 0" }}>Pilirani → Leah</p>
                <p style={{ margin: "0.1rem 0" }}>Maloto → Tadala, Mayamiko</p>
                <p style={{ margin: "0.1rem 0" }}>Ndaona → Wezi, Shamim</p>
                <p style={{ margin: "0.1rem 0" }}>
                  Jamikani → Kelvin, Jarcho, Chipiliro
                </p>
                <p style={{ margin: "0.1rem 0" }}>Lonjezo → Nthouzi</p>
                <p style={{ margin: "0.1rem 0" }}>Paul → Shoni, Faith</p>
              </div>
            </SubCard>

            {/* Fostino */}
            <SubCard title="Fostino">
              <Sub>Telezia → Chimwemwe, Chikondi</Sub>
              <Sub>Mania → Fostino, Eliza, Chikumbukutso</Sub>
              <Sub>
                Steliya → Chrissy, Catherine, Ivy, Mwayiwalo, Hamanson, Faith
              </Sub>
              <Sub>
                <span style={{ color: "#0F6E56" }}>Second wife: Nkonkha</span>
              </Sub>
            </SubCard>

            {/* Doliya */}
            <SubCard title="Doliya">
              <Sub>Husband: Kamwingo — lives in Thyolo, Khonjeni</Sub>
              <Sub>Children: Gomola, Pilirani</Sub>
            </SubCard>

            {/* Falumesi */}
            <SubCard title="Falumesi">
              <Sub>Husband: Chipolopolo</Sub>
              <Sub>Child: Jana — currently at Bangula</Sub>
            </SubCard>

            {/* Lucy (Mataka) */}
            <SubCard title="Lucy (Mataka) — second wife's child">
              <Sub>1. Samuel (died) &nbsp; 2. Chabuka &nbsp; 3. Malia</Sub>
              <Sub>4. Ndariona (Christo) &nbsp; 5. Samuel &nbsp; 6. Aubrey</Sub>
            </SubCard>
          </PersonCard>

          {/* Lice */}
          <PersonCard name="Lice" detail="2 children">
            <Row label="Children" value="Kulima, Steveliya" />
          </PersonCard>

          <PersonCard name="Falesi" detail="No details recorded" />

          {/* Offesi */}
          <PersonCard name="Offesi Kulinji" detail="10 children">
            <SubCard title="Hastings">
              <Sub>Child: Patricia (currently in Lilongwe)</Sub>
            </SubCard>

            <SubCard title="Christina">
              <Sub>No details recorded</Sub>
            </SubCard>

            <SubCard title="Evason">
              <Sub>No details recorded</Sub>
            </SubCard>

            <SubCard title="Lingstone">
              <Sub>
                Children: Thomson, James, Patrick, Gloria, Catherine, Ndaona
              </Sub>
              <div
                style={{
                  marginTop: "0.4rem",
                  fontSize: "0.8rem",
                  color: "#0F6E56",
                }}
              >
                <p style={{ margin: "0.1rem 0" }}>James → Elijah, Beatrice</p>
                <p style={{ margin: "0.1rem 0" }}>
                  Gloria → Shanilla (Shakinah)
                </p>
                <p style={{ margin: "0.1rem 0" }}>Catherine → Precious</p>
                <p style={{ margin: "0.1rem 0" }}>
                  Thomson → children to be added
                </p>
              </div>
            </SubCard>

            <SubCard title="Patrick">
              <Sub>Sons: Yamikani, Paul, Hastings (died young)</Sub>
            </SubCard>

            <SubCard title="Rozi">
              <Sub>Died while young</Sub>
            </SubCard>

            <SubCard title="Charles">
              <Sub>Son: Yohani (Fakeni)</Sub>
            </SubCard>

            <SubCard title="Patricia">
              <Sub>No details recorded</Sub>
            </SubCard>

            <SubCard title="Kulinji">
              <Sub>No details recorded</Sub>
            </SubCard>

            <SubCard title="Lidia">
              <Sub>No details recorded</Sub>
            </SubCard>
          </PersonCard>

          <PersonCard name="Martha" detail="No details recorded" />
          <PersonCard name="Agness" detail="No details recorded" />
        </Section>

        {/* ── Migration ──────────────────────────────────────────────────── */}
        <Section title="Migration Pattern">
          <ol
            style={{
              paddingLeft: "1.2rem",
              fontSize: "0.9rem",
              color: "#04342C",
              lineHeight: 2,
            }}
          >
            <li>Originated in Mozambique</li>
            <li>Migrated and settled in Chididi</li>
            <li>
              Thomson moved to Chazuka (at Green Ntafia), following the river
            </li>
            <li>Later settled in Ngona village</li>
            <li>Some descendants migrated to Zimbabwe</li>
            <li>Patricia (Hastings&apos;s daughter) currently in Lilongwe</li>
          </ol>
        </Section>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div
          style={{
            textAlign: "center",
            borderTop: "1px solid #9FE1CB",
            paddingTop: "1rem",
            marginTop: "1rem",
          }}
        >
          <p style={{ fontSize: "0.78rem", color: "#0F6E56" }}>
            Clan record — Tribe of Kulinji · Originally from Mozambique
          </p>
        </div>
      </div>
    </div>
  );
}
