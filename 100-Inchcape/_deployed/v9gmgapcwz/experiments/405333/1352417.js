"use strict";

(function () {
  const hardcodedVehicleHTML = {
    all: `<li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:models/suv&quot;,&quot;peugeot:models/petrol&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/suv&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:range-help-me-choose/family0&quot;,&quot;peugeot:range-help-me-choose/hybrid&quot;,&quot;peugeot:models/hybrid&quot;]}"><a href="/models/2008-hybrid-suv.html" title="LEARN MORE" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt; New 2008 SUV &lt;p&gt;&lt;span style=&quot;color:#0074E8; font-size:12px;&quot;&gt; HYBRID  &lt;/span&gt; &lt;/p&gt;&lt;/b&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/2008/my25-2008-hybrid/2008-hybrid-model-fly-out-White.png" alt="2008 Hybrid SUV"></div><div class="q-label-container"><span class="q-label"><b> New 2008 SUV <p><span style="color: rgb(0,116,232);font-size: 12.0px;"> Hybrid  </span> </p></b></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:models/diesel&quot;,&quot;peugeot:models/hybrid&quot;,&quot;peugeot:range-help-me-choose/hybrid&quot;,&quot;peugeot:range-help-me-choose/suv&quot;,&quot;peugeot:models/suv&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:models/petrol&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:range-help-me-choose/family0&quot;,&quot;peugeot:b2c_configurator&quot;,&quot;peugeot:range-help-me-choose/family&quot;]}"><a href="https://www.peugeot.com.au/models/3008-suv.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt; New 3008 SUV &lt;p&gt;&lt;span style=&quot;color:#0074E8; font-size:12px;&quot;&gt; HYBRID  &lt;/span&gt; &lt;/p&gt;&lt;/b&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/3008/2024/3008-hybrid/Peugeot-MY24-3008-MHEV-Sprite-810x455--.png" alt="3008 Hybrid SUV"></div><div class="q-label-container"><span class="q-label"><b> New 3008 SUV <p><span style="color: rgb(0,116,232);font-size: 12.0px;"> Hybrid  </span> </p></b></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/suv&quot;,&quot;peugeot:models/suv&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:range-help-me-choose/family0&quot;,&quot;peugeot:b2c_configurator&quot;,&quot;peugeot:range-help-me-choose/family&quot;,&quot;peugeot:range-help-me-choose/7-seat-cars&quot;,&quot;peugeot:models/hybrid&quot;,&quot;peugeot:range-help-me-choose/hybrid&quot;]}"><a href="/models/5008-hybrid-suv.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt; New 5008 SUV &lt;p&gt;&lt;span style=&quot;color:#0074E8; font-size:12px;&quot;&gt; HYBRID  &lt;/span&gt; &lt;/p&gt;&lt;/b&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/5008/2025-hybrid/5008-hybrid-model-fly-out-Ingaro-Blue-v2.png" alt="Ingaro Blue PEUGEOT 5008 Hybrid SUV 7-seater "></div><div class="q-label-container"><span class="q-label"><b> New 5008 SUV <p><span style="color: rgb(0,116,232);font-size: 12.0px;"> Hybrid  </span> </p></b></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/luxury&quot;,&quot;peugeot:range-help-me-choose/hybrid&quot;,&quot;peugeot:models/luxury&quot;,&quot;peugeot:models&quot;,&quot;peugeot:b2c_configurator&quot;,&quot;peugeot:range-help-me-choose/hatchback&quot;,&quot;peugeot:range-help-me-choose/transportation-of-persons&quot;]}"><a href="/models/308-hybrid.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt; New 308 Hatch &lt;p&gt;&lt;span style=&quot;color:#0074E8; font-size:12px;&quot;&gt; HYBRID  &lt;/span&gt; &lt;/p&gt;&lt;/b&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/308/my25-hybrid/308-hybrid-model-fly-out-Obsession-Blue-810x455.png" alt="All-new 308 Hybrid Hatch"></div><div class="q-label-container"><span class="q-label"><b> New 308 Hatch <p><span style="color: rgb(0,116,232);font-size: 12.0px;"> Hybrid  </span> </p></b></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/hybrid&quot;,&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose&quot;,&quot;peugeot:range-help-me-choose/luxury&quot;,&quot;peugeot:b2c_configurator&quot;,&quot;peugeot:configurator&quot;]}"><a href="/models/408-hybrid.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New 408&lt;/b&gt; &lt;p&gt;&lt;span style=&quot;color:#0074E8; font-size:12px;&quot;&gt; HYBRID &lt;/span&gt; &lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt; &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/408/408-hybrid/408-hybrid-model-fly-out-Okenite-White-R.png"></div><div class="q-label-container"><span class="q-label"><b>New 408</b> <p><span style="color: rgb(0,116,232);font-size: 12.0px;"> Hybrid </span> <span style="color: rgb(120,123,128);font-size: 12.0px;"> </span> </p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:b2b_configurator&quot;,&quot;peugeot:range-help-me-choose/all&quot;]}"><a href="https://www.peugeot.com.au/models/partner-van.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;Partner Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;&lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt;PETROL &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/partner/my25-ice/Partner-ICE-Models-Web-810x455-White-R.png" alt="Partner Van"></div><div class="q-label-container"><span class="q-label"><b>Partner Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;"><span style="color: rgb(120,123,128);font-size: 12.0px;">Petrol </span> </p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:models/electric&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose/electric&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:models/family&quot;,&quot;peugeot:models/diesel&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="/models/new-e-partner-van.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New E-Partner Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;ELECTRIC&lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt; &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/partner/my25-e-partner/my25-peugeot-e-partner-electric-van-810x455.png" alt="E-Partner"></div><div class="q-label-container"><span class="q-label"><b>New E-Partner Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;">Electric<span style="color: rgb(120,123,128);font-size: 12.0px;"> </span> </p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose&quot;,&quot;peugeot:models/diesel&quot;]}"><a href="/models/diesel-expert-van.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New Expert Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;&lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt;DIESEL &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/expert/2025-diesel/expert-facelift-model-fly-out-ice-white-v2.png" alt="New PEUGEOT Expert Van"></div><div class="q-label-container"><span class="q-label"><b>New Expert Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;"><span style="color: rgb(120,123,128);font-size: 12.0px;">Diesel </span> </p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:range-help-me-choose/electric&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="/models/expert-van/e-expert.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New E-Expert Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;ELECTRIC&lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/expert/e-expert/Model-fly-out-810x455-E-Expert.png" alt="New E-EXPERT"></div><div class="q-label-container"><span class="q-label"><b>New E-Expert Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;">Electric</p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:models/diesel&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="https://www.peugeot.com.au/models/boxer-van.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;Boxer Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;&lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt;DIESEL MANUAL &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/boxer/2023/Boxer-LWB-810x455-White-R2.png" alt="Boxer Van"></div><div class="q-label-container"><span class="q-label"><b>Boxer Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;"><span style="color: rgb(120,123,128);font-size: 12.0px;">Diesel MANUAL </span> </p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:models/family&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:models/electric&quot;,&quot;peugeot:range-help-me-choose/electric&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:models/petrol&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:models/diesel&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="/models/new-boxer-van/diesel.html" title="Learn more about the PEUGEOT Boxer diesel automatic van" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New Boxer Van&lt;/b&gt;&lt;p style=&quot;color:#787b80; font-size:12px;&quot;&gt;DIESEL AUTOMATIC &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/model-flyout/peugeot-boxer-van-Model-fly-out-810x455-v3.webp" alt="PEUGEOT Boxer van"></div><div class="q-label-container"><span class="q-label"><b>New Boxer Van</b><p style="color: rgb(120,123,128);font-size: 12.0px;">Diesel AUTOMATIC </p></span></div></a></li>`,
    electric: `<li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:models/electric&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose/electric&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:models/family&quot;,&quot;peugeot:models/diesel&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="/models/new-e-partner-van.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New E-Partner Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;ELECTRIC&lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt; &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/partner/my25-e-partner/my25-peugeot-e-partner-electric-van-810x455.png" alt="E-Partner"></div><div class="q-label-container"><span class="q-label"><b>New E-Partner Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;">Electric<span style="color: rgb(120,123,128);font-size: 12.0px;"> </span> </p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:range-help-me-choose/electric&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="/models/expert-van/e-expert.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New E-Expert Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;ELECTRIC&lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/expert/e-expert/Model-fly-out-810x455-E-Expert.png" alt="New E-EXPERT"></div><div class="q-label-container"><span class="q-label"><b>New E-Expert Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;">Electric</p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:models/family&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:models/electric&quot;,&quot;peugeot:range-help-me-choose/electric&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:models/petrol&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:models/diesel&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="/models/new-boxer-van/diesel.html" title="Learn more about the PEUGEOT Boxer diesel automatic van" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New Boxer Van&lt;/b&gt;&lt;p style=&quot;color:#787b80; font-size:12px;&quot;&gt;DIESEL AUTOMATIC &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/model-flyout/peugeot-boxer-van-Model-fly-out-810x455-v3.webp" alt="PEUGEOT Boxer van"></div><div class="q-label-container"><span class="q-label"><b>New Boxer Van</b><p style="color: rgb(120,123,128);font-size: 12.0px;">Diesel AUTOMATIC </p></span></div></a></li>`,
    hybrid: `<li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:models/suv&quot;,&quot;peugeot:models/petrol&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/suv&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:range-help-me-choose/family0&quot;,&quot;peugeot:range-help-me-choose/hybrid&quot;,&quot;peugeot:models/hybrid&quot;]}"><a href="/models/2008-hybrid-suv.html" title="LEARN MORE" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt; New 2008 SUV &lt;p&gt;&lt;span style=&quot;color:#0074E8; font-size:12px;&quot;&gt; HYBRID  &lt;/span&gt; &lt;/p&gt;&lt;/b&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/2008/my25-2008-hybrid/2008-hybrid-model-fly-out-White.png" alt="2008 Hybrid SUV"></div><div class="q-label-container"><span class="q-label"><b> New 2008 SUV <p><span style="color: rgb(0,116,232);font-size: 12.0px;"> Hybrid  </span> </p></b></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:models/diesel&quot;,&quot;peugeot:models/hybrid&quot;,&quot;peugeot:range-help-me-choose/hybrid&quot;,&quot;peugeot:range-help-me-choose/suv&quot;,&quot;peugeot:models/suv&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:models/petrol&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:range-help-me-choose/family0&quot;,&quot;peugeot:b2c_configurator&quot;,&quot;peugeot:range-help-me-choose/family&quot;]}"><a href="https://www.peugeot.com.au/models/3008-suv.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt; New 3008 SUV &lt;p&gt;&lt;span style=&quot;color:#0074E8; font-size:12px;&quot;&gt; HYBRID  &lt;/span&gt; &lt;/p&gt;&lt;/b&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/3008/2024/3008-hybrid/Peugeot-MY24-3008-MHEV-Sprite-810x455--.png" alt="3008 Hybrid SUV"></div><div class="q-label-container"><span class="q-label"><b> New 3008 SUV <p><span style="color: rgb(0,116,232);font-size: 12.0px;"> Hybrid  </span> </p></b></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/suv&quot;,&quot;peugeot:models/suv&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:range-help-me-choose/family0&quot;,&quot;peugeot:b2c_configurator&quot;,&quot;peugeot:range-help-me-choose/family&quot;,&quot;peugeot:range-help-me-choose/7-seat-cars&quot;,&quot;peugeot:models/hybrid&quot;,&quot;peugeot:range-help-me-choose/hybrid&quot;]}"><a href="/models/5008-hybrid-suv.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt; New 5008 SUV &lt;p&gt;&lt;span style=&quot;color:#0074E8; font-size:12px;&quot;&gt; HYBRID  &lt;/span&gt; &lt;/p&gt;&lt;/b&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/5008/2025-hybrid/5008-hybrid-model-fly-out-Ingaro-Blue-v2.png" alt="Ingaro Blue PEUGEOT 5008 Hybrid SUV 7-seater "></div><div class="q-label-container"><span class="q-label"><b> New 5008 SUV <p><span style="color: rgb(0,116,232);font-size: 12.0px;"> Hybrid  </span> </p></b></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/luxury&quot;,&quot;peugeot:range-help-me-choose/hybrid&quot;,&quot;peugeot:models/luxury&quot;,&quot;peugeot:models&quot;,&quot;peugeot:b2c_configurator&quot;,&quot;peugeot:range-help-me-choose/hatchback&quot;,&quot;peugeot:range-help-me-choose/transportation-of-persons&quot;]}"><a href="/models/308-hybrid.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt; New 308 Hatch &lt;p&gt;&lt;span style=&quot;color:#0074E8; font-size:12px;&quot;&gt; HYBRID  &lt;/span&gt; &lt;/p&gt;&lt;/b&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/308/my25-hybrid/308-hybrid-model-fly-out-Obsession-Blue-810x455.png" alt="All-new 308 Hybrid Hatch"></div><div class="q-label-container"><span class="q-label"><b> New 308 Hatch <p><span style="color: rgb(0,116,232);font-size: 12.0px;"> Hybrid  </span> </p></b></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/hybrid&quot;,&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose&quot;,&quot;peugeot:range-help-me-choose/luxury&quot;,&quot;peugeot:b2c_configurator&quot;,&quot;peugeot:configurator&quot;]}"><a href="/models/408-hybrid.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New 408&lt;/b&gt; &lt;p&gt;&lt;span style=&quot;color:#0074E8; font-size:12px;&quot;&gt; HYBRID &lt;/span&gt; &lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt; &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/408/408-hybrid/408-hybrid-model-fly-out-Okenite-White-R.png"></div><div class="q-label-container"><span class="q-label"><b>New 408</b> <p><span style="color: rgb(0,116,232);font-size: 12.0px;"> Hybrid </span> <span style="color: rgb(120,123,128);font-size: 12.0px;"> </span> </p></span></div></a></li>`,
    van: `<li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:b2b_configurator&quot;,&quot;peugeot:range-help-me-choose/all&quot;]}"><a href="https://www.peugeot.com.au/models/partner-van.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;Partner Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;&lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt;PETROL &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/partner/my25-ice/Partner-ICE-Models-Web-810x455-White-R.png" alt="Partner Van"></div><div class="q-label-container"><span class="q-label"><b>Partner Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;"><span style="color: rgb(120,123,128);font-size: 12.0px;">Petrol </span> </p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:models/electric&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose/electric&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:models/family&quot;,&quot;peugeot:models/diesel&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="/models/new-e-partner-van.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New E-Partner Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;ELECTRIC&lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt; &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/partner/my25-e-partner/my25-peugeot-e-partner-electric-van-810x455.png" alt="E-Partner"></div><div class="q-label-container"><span class="q-label"><b>New E-Partner Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;">Electric<span style="color: rgb(120,123,128);font-size: 12.0px;"> </span> </p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose&quot;,&quot;peugeot:models/diesel&quot;]}"><a href="/models/diesel-expert-van.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New Expert Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;&lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt;DIESEL &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/expert/2025-diesel/expert-facelift-model-fly-out-ice-white-v2.png" alt="New PEUGEOT Expert Van"></div><div class="q-label-container"><span class="q-label"><b>New Expert Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;"><span style="color: rgb(120,123,128);font-size: 12.0px;">Diesel </span> </p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:range-help-me-choose/electric&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="/models/expert-van/e-expert.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New E-Expert Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;ELECTRIC&lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/expert/e-expert/Model-fly-out-810x455-E-Expert.png" alt="New E-EXPERT"></div><div class="q-label-container"><span class="q-label"><b>New E-Expert Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;">Electric</p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:models/diesel&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="https://www.peugeot.com.au/models/boxer-van.html" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;Boxer Van&lt;/b&gt;&lt;p style=&quot;color:#0074E8; font-size: 12px;&quot;&gt;&lt;span style=&quot;color:#787b80; font-size:12px;&quot;&gt;DIESEL MANUAL &lt;/span&gt; &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/boxer/2023/Boxer-LWB-810x455-White-R2.png" alt="Boxer Van"></div><div class="q-label-container"><span class="q-label"><b>Boxer Van</b><p style="color: rgb(0,116,232);font-size: 12.0px;"><span style="color: rgb(120,123,128);font-size: 12.0px;">Diesel MANUAL </span> </p></span></div></a></li><li class="q-bodystyle-container gm-filter-item PCAT66-visible" data-gm-filter="{&quot;cq:tags&quot;:[&quot;peugeot:models&quot;,&quot;peugeot:models/family&quot;,&quot;peugeot:range-help-me-choose/all&quot;,&quot;peugeot:configurator&quot;,&quot;peugeot:models/electric&quot;,&quot;peugeot:range-help-me-choose/electric&quot;,&quot;peugeot:models/van&quot;,&quot;peugeot:range-help-me-choose/vans&quot;,&quot;peugeot:models/petrol&quot;,&quot;peugeot:range-help-me-choose/petrol&quot;,&quot;peugeot:models/diesel&quot;,&quot;peugeot:range-help-me-choose/diesel&quot;,&quot;peugeot:b2b_configurator&quot;]}"><a href="/models/new-boxer-van/diesel.html" title="Learn more about the PEUGEOT Boxer diesel automatic van" class="stat-image-link q-bodystyle-link analytics q-nav-segment__link" data-dtm="carline family" data-gtm-event="uaevent" data-gtm-event-category="Header::PrimaryNavigation" data-gtm-event-action="Redirection::Internal" data-gtm-event-label="&lt;b&gt;New Boxer Van&lt;/b&gt;&lt;p style=&quot;color:#787b80; font-size:12px;&quot;&gt;DIESEL AUTOMATIC &lt;/p&gt;"><div class="q-image-container"><img src="/content/dam/peugeot/australia/models/model-flyout/peugeot-boxer-van-Model-fly-out-810x455-v3.webp" alt="PEUGEOT Boxer van"></div><div class="q-label-container"><span class="q-label"><b>New Boxer Van</b><p style="color: rgb(120,123,128);font-size: 12.0px;">Diesel AUTOMATIC </p></span></div></a></li>`
  };

  /* eslint-disable no-console */

  const kamPcat66Config = {
    currentFilter: 'all',
    hardcodedVehicleHTML,
    hideOriginalStructure: () => {
      const segmentVehicles = document.querySelector('.segment_vehicles');
      if (segmentVehicles) {
        segmentVehicles.classList.add('PCAT66-hidden');
      }

      // Also hide the original flyout-nav content if needed
      const flyoutNav = document.querySelector('#flyout-nav');
      if (flyoutNav) {
        const originalContainers = flyoutNav.querySelectorAll('.q-bodystyle-container, [data-gm-filter]');
        originalContainers.forEach(container => {
          container.classList.add('PCAT66-hidden');
        });
      }
    },
    hideOurRangeSection: () => {
      const button = Array.from(document.querySelectorAll('.flyout-content a.q-button')).find(el => el.textContent.trim() === 'Our range');
      if (button) {
        const container = button.closest('.grid_builder_v2');
        if (container) {
          container.classList.add('PCAT66-hidden');
        }
      }
    },
    hideMobileMenuItems: () => {
      const mobileMenuItems = document.querySelectorAll('.q-nav-offcanvas__scroller > ul.off-canvas-list > li.off-canvas-list__item > a.off-canvas-list__link');
      // check if mobileMenuItems text contains "MODELS"
      mobileMenuItems.forEach(item => {
        if (item.textContent.trim() === 'MODELS') {
          // select next sibling of item ul.left-submenu
          const leftSubmenu = item.nextElementSibling;
          if (leftSubmenu) {
            leftSubmenu.classList.add('PCAT66-leftSubmenu');
            leftSubmenu.querySelectorAll('li').forEach(li => {
              li.classList.add('PCAT66-hidden');
            });
          }
        }
      });
    },
    createCustomFilterButtons: () => {
      const isDesktop = window.innerWidth > 1081;
      let segmentVehicles = null;
      let leftSubmenu = null;
      if (isDesktop) {
        segmentVehicles = document.querySelector('.segment_vehicles');
        if (!segmentVehicles) {
          console.warn('PCAT66: .segment_vehicles not found');
          return;
        }
      } else {
        leftSubmenu = document.querySelector('.PCAT66-leftSubmenu');
        if (!leftSubmenu) {
          console.warn('PCAT66: .PCAT66-leftSubmenu not found');
          return;
        }
      }

      // Check if custom filter already exists
      if (document.querySelector('.PCAT66-custom-filter-wrapper')) {
        console.log('PCAT66: Custom filter already exists');
        return;
      }

      // Use insertAdjacentHTML instead of createElement
      const filterHTML = `
      <div class="PCAT66-custom-filter-wrapper">
       <h2>MODELS</h2>
        <ul class="PCAT66-custom-filter-list">
          <li class="PCAT66-filter-item PCAT66-filter-all PCAT66-active" data-filter="all">
            <a href="#" class="PCAT66-filter-link">All</a>
          </li>
          <li class="PCAT66-filter-item PCAT66-filter-electric" data-filter="electric">
            <a href="#" class="PCAT66-filter-link">Electric</a>
          </li>
          <li class="PCAT66-filter-item PCAT66-filter-hybrid" data-filter="hybrid">
            <a href="#" class="PCAT66-filter-link">Hybrid</a>
          </li>
          <li class="PCAT66-filter-item PCAT66-filter-van" data-filter="van">
            <a href="#" class="PCAT66-filter-link">Van Range</a>
          </li>
        </ul>
        <div class="PCAT66-custom-vehicle-list data-gm-filter-target q-content-container q-segment-vehicles small-12 q-bodystyles" id="PCAT66-vehicle-container"></div>
      </div>
    `;

      // Insert filter wrapper in the correct place
      if (isDesktop && segmentVehicles) {
        // Desktop: before .segment_vehicles
        segmentVehicles.insertAdjacentHTML('beforebegin', filterHTML);
      } else if (!isDesktop && leftSubmenu) {
        // Mobile: inside .PCAT66-leftSubmenu at the end
        leftSubmenu.insertAdjacentHTML('beforeend', filterHTML);

        // Add mobile-only CTA buttons at the end of the wrapper
        const wrapper = leftSubmenu.querySelector('.PCAT66-custom-filter-wrapper:last-of-type');
        if (wrapper) {
          const mobileCtasHTML = `
          <div class="PCAT66-mobile-cta-wrapper">
            <a href="https://findadealer.peugeot.com.au/" class="q-button q-button--primary PCAT66-mobile-cta">
              FIND A DEALER
            </a>
            <a href="https://configurator.peugeot.com.au/" class="q-button q-button--primary PCAT66-mobile-cta">
              BUILD &amp; PRICE
            </a>
            <a href="https://www.peugeot.com.au/buy/new-car-offers.html" class="q-button q-button--primary PCAT66-mobile-cta">
              DISCOVER OUR OFFERS
            </a>
          </div>
        `;
          wrapper.insertAdjacentHTML('beforeend', mobileCtasHTML);
        }
      }
    },
    createCustomVehicleList: () => {
      // Check if custom list already exists
      const vehicleContainer = document.querySelector('#PCAT66-vehicle-container');
      if (vehicleContainer) {
        console.log('PCAT66: Custom vehicle list already exists');
        // Render all vehicles initially
        kamPcat66Config.renderVehicles('all');
        return;
      }

      // Find the filter wrapper and get the container
      const filterWrapper = document.querySelector('.PCAT66-custom-filter-wrapper');
      if (!filterWrapper) {
        console.warn('PCAT66: Filter wrapper not found');
        return;
      }

      // The container should already be created in createCustomFilterButtons
      // Just render the vehicles
      kamPcat66Config.renderVehicles('all');
    },
    renderVehicles: filterType => {
      const vehicleContainer = document.querySelector('#PCAT66-vehicle-container');
      if (!vehicleContainer) {
        console.warn('PCAT66: Vehicle container not found');
        return;
      }

      // Clear existing content
      vehicleContainer.innerHTML = '';

      // Get hardcoded HTML for the filter type
      const vehicleHTML = kamPcat66Config.hardcodedVehicleHTML[filterType] || kamPcat66Config.hardcodedVehicleHTML.all;

      // Insert the hardcoded HTML
      vehicleContainer.innerHTML = vehicleHTML;
      console.log(`PCAT66: Rendered hardcoded vehicles for filter: ${filterType}`);
    },
    initFilterFunctionality: () => {
      const filterButtons = document.querySelectorAll('.PCAT66-filter-item');
      filterButtons.forEach(button => {
        const filterLink = button.querySelector('.PCAT66-filter-link');
        if (filterLink) {
          Kameleoon.API.Utils.addEventListener(filterLink, 'click', e => {
            e.preventDefault();
            const filterType = button.getAttribute('data-filter') || 'all';

            // Update active state
            filterButtons.forEach(btn => {
              btn.classList.remove('PCAT66-active');
            });
            button.classList.add('PCAT66-active');

            // Update current filter
            kamPcat66Config.currentFilter = filterType;

            // Render filtered vehicles
            kamPcat66Config.renderVehicles(filterType);
          });
        }
      });
    },
    initMobile: () => {
      // Hide mobile menu items
      kamPcat66Config.hideMobileMenuItems();
      // Create custom filter buttons
      kamPcat66Config.createCustomFilterButtons();

      // Create custom vehicle list
      kamPcat66Config.createCustomVehicleList();

      // Initialize filter functionality
      kamPcat66Config.initFilterFunctionality();
    },
    init: () => {
      // Wait for segment_vehicles to be available
      Kameleoon.API.Core.runWhenElementPresent('.segment_vehicles', () => {
        // Hide original structure
        kamPcat66Config.hideOriginalStructure();

        // Hide "Our range" section
        kamPcat66Config.hideOurRangeSection();

        // Create custom filter buttons
        kamPcat66Config.createCustomFilterButtons();

        // Create custom vehicle list
        kamPcat66Config.createCustomVehicleList();

        // Initialize filter functionality
        kamPcat66Config.initFilterFunctionality();
      });
    }
  };

  /* eslint-disable no-console */

  (function kamPcat66V1() {
    function init() {
      console.log('*** Peugeot T66 - Model Header Menu ***');
      document.body.classList.add('PCAT66', 'PCAT66-desktop');
      kamPcat66Config.init();
    }
    function initMobile() {
      console.log('*** Peugeot T66 - Model Header Menu ***');
      document.body.classList.add('PCAT66', 'PCAT66-mobile');
      kamPcat66Config.initMobile();
    }
    if (!window.t66Start) {
      window.t66Start = true;
      if (window.innerWidth < 1081) {
        Kameleoon.API.Core.runWhenElementPresent('.q-nav-offcanvas__scroller > ul.off-canvas-list', initMobile);
      } else {
        Kameleoon.API.Core.runWhenElementPresent('.nav-flyout .content-container .flyout-content', init);
      }
    }
  })();
})();